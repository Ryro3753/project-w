using API.Models.Character;
using Dapper;
using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ICharacterSheetService
    {
    }

    public class CharacterSheetService : ICharacterSheetService
    {
        private readonly IDbConnection _connection;
        private readonly IFeatureService _featureService;

        public CharacterSheetService(IDbConnection connection, IFeatureService featureService)
        {
            _connection = connection;
            _featureService = featureService;
        }

        

    }
}
