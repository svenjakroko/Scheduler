using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Scheduler.Data
{
    public class SchedulerRepository : ISchedulerRepository // TODO - update i delete
    {
        SchedulerContext _ctx;
        public SchedulerRepository(SchedulerContext ctx)
        {
            _ctx = ctx;
        }

        public IQueryable<Event> GetEvents()
        {
            return _ctx.Events;
        }

        public bool Save()
        {
            try
            {
                return _ctx.SaveChanges() > 0; // izvrsila neka promjena  
            }
            catch (Exception)
            {
                // TODO dovrsi
                return false;
            }
        }
        public bool AddEvent(Event newEvent)
        {
            try
            {
                _ctx.Events.Add(newEvent);
                return true;
            }
            catch (Exception)
            {// TODO dovrsit loganje error-a
                return false;
            }
        }

        public IQueryable<Event> GetEventById(int eventId)
        {
            return _ctx.Events.Where(r => r.Id == eventId);
        }

        // TODO - update i delete event
    }
}