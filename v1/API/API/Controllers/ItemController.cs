using API.Models.Common;
using API.Models.Item;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : Controller
    {
        private readonly IItemService _itemService;
        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }
        [HttpGet("GetItemsByUserId")]
        public async Task<IEnumerable<ItemType>> GetItemsByUserId(string userId)
        {
            return await _itemService.GetItemsByUserId(userId);
        }
        [HttpPost("ShareItemType")]
        public async Task<bool> ShareItemType(ShareRequest request)
        {
            return await _itemService.ShareItemType(request);
        }
        [HttpDelete("DeleteItemType")]
        public async Task<bool> DeleteItemType(int ItemTypeId, string UserId)
        {
            return await _itemService.DeleteItemType(ItemTypeId, UserId);
        }
        [HttpPost("UpdateItemType")]
        public async Task<ItemTypeDetail> UpdateItemType(ItemTypeUpdateRequest request)
        {
            return await _itemService.UpdateItemType(request);
        }
        [HttpPost("InsertItemType")]
        public async Task<ItemType> InsertItemType(OnlyUserId request)
        {
            return await _itemService.InsertItemType(request);
        }
        [HttpGet("GetItemType")]
        public async Task<ItemTypeDetail> GetItemType(int itemTypeId, string userId)
        {
            return await _itemService.GetItemType(itemTypeId, userId);
        }
        [HttpPost("ItemTypeUploadImage")]
        public async Task<bool> ItemTypeUploadImage(int itemTypeId)
        {
            var imageFilePath = itemTypeId.ToString() + ".png";
            imageFilePath = Path.Combine(_itemService.GetImageFolderPath(), imageFilePath);

            using var stream = System.IO.File.Create(imageFilePath);

            foreach (var item in Request.Form.Files)
            {
                await item.CopyToAsync(stream);
            }

            return await _itemService.UpdateHasImage(itemTypeId);
        }

        [HttpGet("GetItemAttributes")]
        public IEnumerable<string> GetItemAttributes()
        {
            return _itemService.GetItemAttributes();
        }


    }
}
