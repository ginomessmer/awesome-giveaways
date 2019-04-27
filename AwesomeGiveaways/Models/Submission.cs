using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AwesomeGiveaways.Models
{
    public class Submission
    {
        [Key]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime SubmittedAt { get; set; } = DateTime.Now;
    }
}
