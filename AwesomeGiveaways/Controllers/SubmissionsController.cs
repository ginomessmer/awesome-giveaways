using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AwesomeGiveaways.Common;
using AwesomeGiveaways.Models;

namespace AwesomeGiveaways.Controllers
{
    [Route("api/submissions")]
    [ApiController]
    public class SubmissionsController : ControllerBase
    {
        private readonly GiveawayDbContext _context;

        public SubmissionsController(GiveawayDbContext context)
        {
            _context = context;
        }

        // GET: api/Submissions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Submission>>> GetSubmission()
        {
            return await _context.Submission.ToListAsync();
        }

        // GET: api/Submissions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Submission>> GetSubmission(string email)
        {
            var submission = await _context.Submission.FindAsync(email);

            if (submission == null)
            {
                return NotFound();
            }

            return submission;
        }

        // POST: api/Submissions
        [HttpPost]
        public async Task<ActionResult<Submission>> PostSubmission(Submission submission)
        {
            // Check whether submission already exists
            var existingSubmission = await _context.Submission.FirstOrDefaultAsync(x => x.Email == submission.Email);
            if (existingSubmission != null)
                return BadRequest("Email already registered");

            // Add submission
            _context.Submission.Add(submission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubmission", new { id = submission.Email }, submission);
        }

        private bool SubmissionExists(string id)
        {
            return _context.Submission.Any(e => e.Email == id);
        }
    }
}
