using API.Models;
using API.Models.Features;
using System;
using System.Collections.Generic;

namespace API.Services
{
    public interface IFeatureService
    {
        IEnumerable<Feature> ReadFeatures(string feature);
        string UnreadFeatures(List<Feature> features);
        IEnumerable<string> GetSections();
        Dictionary<string, List<string>> GetTypes();
        Dictionary<string, List<string>> GetTypesForRequirements();
    }

    public class FeatureService : IFeatureService
    {

        public FeatureService()
        {
        }

        public IEnumerable<Feature> ReadFeatures(string feature)
        {
            //feature = "SavingThrow!Strength!2!Character;level;18!?Ability!Strength!1!!";
            var features = new List<Feature>();

            if (string.IsNullOrEmpty(feature))
                return null;
            //Split each feature
            var splittedFeature = feature.Split('?');

            //Now split and create a feature object with each splitted item
            for (int i = 0; i < splittedFeature.Length; i++)
            {
                var newFeature = new Feature();
                var itemSplitted = splittedFeature[i].Split('!');
                newFeature.Section = itemSplitted[0];
                newFeature.Type = itemSplitted[1];
                newFeature.Value = itemSplitted[2];

                //split requirements
                newFeature.Requirements = new List<Requirement>();
                if (!string.IsNullOrEmpty(itemSplitted[3]))
                {
                    var requirementsSplitted = itemSplitted[3].Split(':');
                    for (int q = 0; q < requirementsSplitted.Length; q++)
                    {
                        var requirementSplitted = itemSplitted[3].Split(';');
                        var newRequirement = new Requirement
                        {
                            Section = requirementSplitted[0],
                            Type = requirementSplitted[1],
                            Value = requirementSplitted[2]
                        };
                        newFeature.Requirements.Add(newRequirement);
                    }
                }
                features.Add(newFeature);

            }

            return features;

        }

        public string UnreadFeatures(List<Feature> features)
        {
            if (features == null)
                return String.Empty;
            var listString = new List<string>();
            for (int i = 0; i < features.Count; i++)
            {
                var str = features[i].Section + "!" + features[i].Type + "!" + features[i].Value + "!";
                if (features[i].Requirements != null)
                {
                    var requirementsListString = new List<string>();
                    for (int q = 0; q < features[i].Requirements.Count; q++)
                    {
                        var requirementStr = features[i].Requirements[q].Section + ";" + features[i].Requirements[q].Type + ";" + features[i].Requirements[q].Value + "!";
                        requirementsListString.Add(requirementStr);
                    }
                    str += String.Join(':', requirementsListString);
                }
                else
                    str += "!";
                listString.Add(str);
            }

            return String.Join('?', listString);
        }

        public IEnumerable<string> GetSections()
        {
            return Constants.Feature_Sections;
        }

        public Dictionary<string, List<string>> GetTypes()
        {
            return Constants.Feature_Types;
        }

        public Dictionary<string, List<string>> GetTypesForRequirements()
        {
            return Constants.Feature_TypesForRequirements;
        }

    }
}
