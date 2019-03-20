using Microsoft.AspNetCore.Antiforgery;
using SunriseBank.Controllers;

namespace SunriseBank.Web.Host.Controllers
{
    public class AntiForgeryController : SunriseBankControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
