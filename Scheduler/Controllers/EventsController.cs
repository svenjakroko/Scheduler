using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Scheduler.Controllers
{
    public class EventsController : ApiController
    {
        private ISchedulerRepository _repo;

        public EventsController(ISchedulerRepository repo)
        {
            _repo = repo;
        }
        public IEnumerable<Event> Get() // defaultno mu daje atribut HTTP GET
        {
            var events = _repo.GetEvents()
                .OrderByDescending(t => t.From)
                .Take(25)
                .ToList();

            return events; // vrati ove podatke u result u home-kalendar.js koji je zvao http.get()
        }
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Event newEvent)
        {
            if (newEvent.From == default(DateTime)) // popravi date ako je random vrijednost
            {
                newEvent.From = DateTime.UtcNow;
            }

            if (_repo.AddEvent(newEvent) && _repo.Save())
            {
                return Request.CreateResponse(HttpStatusCode.Created, newEvent);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        public IEnumerable<Event> Get(int Id)
        {
            return _repo.GetEventById(Id); // vraca ovaj podatak requestu
        }

    }
}
