using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Threading.Tasks;
using API.Models.Common;
using API.Models.Item;
using Dapper;
using Microsoft.AspNetCore.Hosting;

namespace API.Services
{
    public interface IItemService
    {
        string GetImageFolderPath();
        Task<IEnumerable<ItemType>> GetItemsByUserId(string userId);
        Task<bool> ShareItemType(ShareRequest request);
        Task<bool> DeleteItemType(int ItemTypeId, string UserId);
        Task<ItemTypeDetail> UpdateItemType(ItemTypeUpdateRequest request);
        Task<ItemType> InsertItemType(OnlyUserId request);
        Task<ItemTypeDetail> GetItemType(int itemTypeId);
        Task<bool> UpdateHasImage(int itemTypeId);
    }

    public class ItemService : IItemService
    {
        private readonly IDbConnection _connection;
        private readonly IHelperService _helperService;
        private readonly IFeatureService _featureService;
        private readonly IWebHostEnvironment _env;

        public ItemService(IDbConnection connection, IHelperService helperService, IFeatureService featureService, IWebHostEnvironment env)
        {
            _connection = connection;
            _helperService = helperService;
            _featureService = featureService;
            _env = env;
        }

        public string GetImageFolderPath()
        {
            return Path.Combine(_env.WebRootPath, "images", "ItemImages");
        }

        public async Task<IEnumerable<ItemType>> GetItemsByUserId(string userId)
        {
            var result = await _connection.QueryAsync<ItemType>("Select * from public.fn_getitemsbyuserid(@userid)", new { userid = userId });
            return result;
        }

        public async Task<bool> ShareItemType(ShareRequest request)
        {
            var userId = await _helperService.CheckUsernameReturnUserId(request.Username);

            var shareItem = await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_shareitemtype(@itemtypeid, @userid)", new { itemtypeid = request.ObjectId, userid = userId });
            if (!shareItem)
                throw new Exception(String.Format("This item already shared with {0}", request.Username));

            return shareItem;
        }
        public async Task<bool> DeleteItemType(int ItemTypeId, string UserId)
        {
            var result = await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_deleteitemtype(@itemtypeid, @userid)", new { itemtypeid = ItemTypeId, userid = UserId });
            if (!result)
                throw new Exception("You do not have permission to delete this item");
            return result;
        }

        public async Task<ItemTypeDetail> UpdateItemType(ItemTypeUpdateRequest request)
        {
            var data = await _connection.QueryFirstOrDefaultAsync<ItemTypeDetailQuery>("Select * from public.fn_updateitemtype(@itemtypeid,@newname,@newdescription,@newcategory, @newtype, @newequippable, @newtags,@newfeatures, @newattributes)",
                new { itemtypeid = request.ItemTypeId, newname = request.Name, newdescription = request.Description,
                    newcategory = request.Category, newtype = request.Type, newequippable = request.Equippable, 
                    newtags = request.Tags, newfeatures = _featureService.UnreadFeatures(request.Features), newattributes = "" });
            return new ItemTypeDetail
            {
                Id = data.Id,
                Name = data.Name,
                Description = data.Description,
                Category = data.Category,
                Tags = data.Tags,
                Type = data.Type,
                Equippable = data.Equippable,
                HasImage = data.HasImage,
                Username = data.Username,
                Features = _featureService.ReadFeatures(data.Features),
                Attributes = ReadAttributes(data.Attributes)
            };
        }

        public async Task<ItemType> InsertItemType(OnlyUserId request)
        {
            return await _connection.QueryFirstOrDefaultAsync<ItemType>("Select * from public.fn_insertitemtype(@userid)", new { userid = request.UserId });
        }

        public async Task<ItemTypeDetail> GetItemType(int itemTypeId)
        {
            var data = await _connection.QueryFirstOrDefaultAsync<ItemTypeDetailQuery>("Select * from public.fn_getitemtype(@itemtypeid)", new { itemtypeid = itemTypeId });
            return new ItemTypeDetail
            {
                Id = data.Id,
                Name = data.Name,
                Description = data.Description,
                Category = data.Category,
                Tags = data.Tags,
                Type = data.Type,
                Equippable = data.Equippable,
                HasImage = data.HasImage,
                Username = data.Username,
                Features = _featureService.ReadFeatures(data.Features),
                Attributes = ReadAttributes(data.Attributes)
            };
        }

        public async Task<bool> UpdateHasImage(int itemTypeId)
        {
            return await _connection.QueryFirstOrDefaultAsync<bool>("SELECT * from public.fn_updateitemtypehasimage(@raceid, @hasimage)", new { itemtypeid = itemTypeId, hasimage = true });
        }


        public IEnumerable<ItemAttribute> ReadAttributes(string attributes)
        {
            if (string.IsNullOrEmpty(attributes))
                return null;

            var list = new List<ItemAttribute>();
            var attributesSplitted = attributes.Split(';');
            for (int i = 0; i < attributesSplitted.Length; i++)
            {
                var scopedAttributes = attributesSplitted[i].Split(':');
                var item = new ItemAttribute
                {
                    Attribute = scopedAttributes[0],
                    Value = scopedAttributes[1]
                };
                list.Add(item);
            }
            return list;
        }

        public string UnreadAttributes(List<ItemAttribute> features)
        {
            var strList = new List<string>();
            for (int i = 0; i < features.Count; i++)
            {
                strList.Add(features[i].Attribute + ":" + features[i].Value);
            }
            return String.Join(';', strList);
        }


    }
}
