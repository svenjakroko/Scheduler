using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Scheduler.Controllers
{
    public class HomeController : Controller
    {
        private ISchedulerRepository _repo;

        public HomeController(ISchedulerRepository repo)
        {
            _repo = repo;
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Add()
        {
            ViewBag.Message = "< form >";

            // za @model na test viewu, ne treba ako se nece koristiti @model
            var events = _repo.GetEvents()
                .OrderByDescending(t => t.From)
                .Take(25)
                .ToList();

            return View(events);
        }
        public ActionResult Kalendar()
        {
            ViewBag.Message = "Calendar";

            var events = _repo.GetEvents()
                .OrderByDescending(t => t.From)
                .Take(25)
                .ToList();

            return View(events);
        }
    }
}