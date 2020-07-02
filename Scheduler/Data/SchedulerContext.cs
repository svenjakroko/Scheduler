using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Scheduler.Data
{
    public class SchedulerContext : DbContext // za komunikaciju izmedu koda i baze podataka
    {
        public SchedulerContext() : base("DefaultConnection")
        {

        }

        public DbSet<Event> Events { get; set; }
    }
}