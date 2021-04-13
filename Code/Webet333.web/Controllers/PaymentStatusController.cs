using Microsoft.AspNetCore.Mvc;

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