using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AwesomeGiveaways.Models;

namespace AwesomeGiveaways.Common
{
    public class GiveawayDbContext : DbContext
    {
        public GiveawayDbContext (DbContextOptions<GiveawayDbContext> options)
            : base(options)
        {
        }

        public DbSet<AwesomeGiveaways.Models.Submission> Submission { get; set; }
    }
}
