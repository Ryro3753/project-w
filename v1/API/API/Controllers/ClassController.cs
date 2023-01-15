using API.Models;
using API.Models.Class;
using API.Models.Common;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClassController : Controller
    {
        private readonly IClassService _classService;
        public ClassController(IClassService classService)
        {
            _classService = classService;
        }
        [HttpGet("GetAllClassesByUserId")]
        public async Task<IEnumerable<CharacterClass>> GetAllClassesByUserId(string userId)
        {
            return await _classService.GetAllClassesByUserId(userId);
        }

        [HttpGet("GetClassDetail")]
        public async Task<ClassDetail> GetClassDetail(int classId)
        {
            return await _classService.GetClassDetail(classId);
        }

        [HttpPost("UpdateClass")]
        public async Task<bool> UpdateClass(ClassUpdateRequest request)
        {
            return await _classService.UpdateClass(request);
        }

        [HttpPost("InsertClass")]
        public async Task<CharacterClass> InsertClass(OnlyUserId request)
        {
            return await _classService.InsertClass(request);
        }

        [HttpPost("ClassUploadImage")]
        public async Task<bool> ClassUploadImage(int classId)
        {
            var imageFilePath = classId.ToString() + ".png";
            imageFilePath = Path.Combine(_classService.GetImageFolderPath(), imageFilePath);

            using var stream = System.IO.File.Create(imageFilePath);

            foreach (var item in Request.Form.Files)
            {
                await item.CopyToAsync(stream);
            }

            return await _classService.UpdateHasImage(classId);
        }

        [HttpPost("ShareClass")]
        public async Task<bool> ShareClass([FromBody] ShareRequest request)
        {
            return await _classService.ShareClass(request);
        }

        [HttpDelete("DeleteClass")]
        public async Task<bool> DeleteClass(int ClassId, string UserId)
        {
            return await _classService.DeleteClass(ClassId,  UserId );
        }

        [HttpGet("GetAbilities")]
        public IEnumerable<string> GetAbilities()
        {
            return Constants.Abilities;
        }
        
    }
}
