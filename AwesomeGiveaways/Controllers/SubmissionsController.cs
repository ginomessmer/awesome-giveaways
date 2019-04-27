using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AwesomeGiveaways.Common;
using AwesomeGiveaways.Models;
using Microsoft.AspNetCore.SignalR;
using AwesomeGiveaways.Hubs;

namespace AwesomeGiveaways.Controllers
{
    [Route("api/submissions")]
    [ApiController]
    public class SubmissionsController : ControllerBase
    {
        private readonly GiveawayDbContext _context;
        private readonly IHubContext<GiveawayHub> _hubContext;

        public SubmissionsController(GiveawayDbContext context, IHubContext<GiveawayHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        // GET: api/Submissions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Submission>>> GetSubmission()
        {
            return await _context.Submission.ToListAsync();
        }

        [HttpGet("random")]
        public async Task<ActionResult<Submission>> GetRandomSubmission()
        {
            return await _context.Submission.OrderBy(x => Guid.NewGuid()).FirstAsync();
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
            var existingSubmission = await _context.Submission.FirstOrDefaultAsync(x => x.Email.ToLower() == submission.Email.ToLower() 
                || x.Name.ToLower() == submission.Name.ToLower());

            if (existingSubmission != null)
                return BadRequest("Email already registered");

            // Add submission
            _context.Submission.Add(submission);
            await _context.SaveChangesAsync();

            // Notify dashboard
            int count = await _context.Submission.CountAsync();
            await _hubContext.Clients.All.SendAsync("counterReceived", count);

            return CreatedAtAction("GetSubmission", new { id = submission.Email }, submission);
        }

        private bool SubmissionExists(string id)
        {
            return _context.Submission.Any(e => e.Email == id);
        }
    }
}
