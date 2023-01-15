using API.Models.Login;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FeatureController : Controller
    {
        private readonly IFeatureService _featureService;
        public FeatureController(IFeatureService featureService)
        {
            _featureService = featureService;
        }

        [HttpGet("GetSections")]
        public IEnumerable<string> GetSections()
        {
            return _featureService.GetSections();
        }

        [HttpGet("GetTypes")]
        public Dictionary<string, List<string>> GetTypes()
        {
            return _featureService.GetTypes();
        }

        [HttpGet("GetTypesForRequirements")]
        public Dictionary<string, List<string>> GetTypesForRequirements()
        {
            return _featureService.GetTypesForRequirements();
        }

    }
}
