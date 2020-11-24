using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;

namespace Webet333.web.Controllers
{
    public class PaymentStatusController : Controller
    {
        [HttpPost]
        [HttpGet]
        [Route("PaymentStatus")]
        public IActionResult PaymentStatus(string status)
        {
            status = status == null ? "pending" : status;
            ViewData["status"] = status;
            return View(ViewData);
        }
    }
}
