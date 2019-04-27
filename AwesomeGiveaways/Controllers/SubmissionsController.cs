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
        public async Task<ActionResult<Submission>> GetSubmission(string id)
        {
            var submission = await _context.Submission.FindAsync(id);

            if (submission == null)
            {
                return NotFound();
            }

            return submission;
        }

        // PUT: api/Submissions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubmission(string id, Submission submission)
        {
            if (id != submission.Email)
            {
                return BadRequest();
            }

            _context.Entry(submission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubmissionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Submissions
        [HttpPost]
        public async Task<ActionResult<Submission>> PostSubmission(Submission submission)
        {
            _context.Submission.Add(submission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubmission", new { id = submission.Email }, submission);
        }

        // DELETE: api/Submissions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Submission>> DeleteSubmission(string id)
        {
            var submission = await _context.Submission.FindAsync(id);
            if (submission == null)
            {
                return NotFound();
            }

            _context.Submission.Remove(submission);
            await _context.SaveChangesAsync();

            return submission;
        }

        private bool SubmissionExists(string id)
        {
            return _context.Submission.Any(e => e.Email == id);
        }
    }
}
