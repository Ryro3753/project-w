using API.Models.Common;
using API.Models.Spell;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ISpellService
    {
        Task<IEnumerable<Spell>> GetAllSpellsByUserId(string userId);
        Task<SpellDetail> GetSpell(int spellId, string userId);
        Task<Spell> InsertSpell(OnlyUserId request);
        Task<SpellDetail> UpdateSpell(SpellUpdateRequest request);
        Task<bool> ShareSpell(ShareRequest request);
        Task<bool> DeleteSpell(int SpellId, string UserId);
        Task<IEnumerable<SpellDetail>> GetAllSpells(string userId);
    }

    public class SpellService : ISpellService
    {
        private readonly IDbConnection _connection;
        private readonly IHelperService _helperService;

        public SpellService(IDbConnection connection,  IHelperService helperService)
        {
            _connection = connection;
            _helperService = helperService;
        }

        public async Task<IEnumerable<Spell>> GetAllSpellsByUserId(string userId)
        {
            var result = await _connection.QueryAsync<Spell>("Select * from public.fn_getspellsbyuserid(@userid)", new { userid = userId });
            return result;
        }

        public async Task<SpellDetail> GetSpell(int spellId, string userId)
        {
            var data = await _connection.QueryFirstOrDefaultAsync<SpellDetail>("Select * from public.fn_getspell(@traitid,@userid)", new { spellId = spellId, userid = userId });
            if (data == null)
                throw new Exception("No spell found");

            return data;
        }

        public async Task<Spell> InsertSpell(OnlyUserId request)
        {
            return await _connection.QueryFirstOrDefaultAsync<Spell>("Select * from public.fn_insertspell(@userid)", new { userid = request.UserId });

        }

        public async Task<SpellDetail> UpdateSpell(SpellUpdateRequest request)
        {
            return await _connection.QueryFirstOrDefaultAsync<SpellDetail>(@"Select * from public.fn_updatespell(@spellid,@newname,@newdescription,@newlevel,@newschool,@newcastingtype,@newcastingtime
                    ,@newcastingdescription,@newduration,@newcomponents,@newcomponentsdescription,@newrange,@newconcentration,@newrituel,@newmana)",
                new {
                    spellid = request.Id,
                    newname = request.Name,
                    newdescription = request.Description,
                    newlevel = request.Level,
                    newschool = request.School,
                    newcastingtype = request.CastingType,
                    newcastingtime = request.CastingTime,
                    newcastingdescription = request.CastingDescription,
                    newduration = request.Duration,
                    newcomponents = request.Components,
                    newcomponentsdescription = request.ComponentsDescription,
                    newrange = request.Range,
                    newconcentration = request.Concentration,
                    newrituel = request.Ritual,
                    newmana = request.Mana
                });
        }

        public async Task<bool> ShareSpell(ShareRequest request)
        {
            var userId = await _helperService.CheckUsernameReturnUserId(request.Username);

            var shareTrait = await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_sharespell(@traitid, @userid)", new { traitid = request.ObjectId, userid = userId });
            if (!shareTrait)
                throw new Exception(String.Format("This spell already shared with {0}", request.Username));

            return shareTrait;
        }

        public async Task<bool> DeleteSpell(int SpellId, string UserId)
        {
            var result = await _connection.QueryFirstOrDefaultAsync<bool>("Select * from public.fn_deletespell(@spellid, @userid)", new { spellid = SpellId, userid = UserId });
            if (!result)
                throw new Exception("You do not have permission to delete this spell");
            return result;
        }

        public async Task<IEnumerable<SpellDetail>> GetAllSpells(string userId)
        {
            return await _connection.QueryAsync<SpellDetail>("Select * from public.fn_getallspells(@userid)", new { userid = userId });

        }

    }
}
