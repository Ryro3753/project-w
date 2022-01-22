using API.Models;
using API.Models.Features;
using System;
using System.Collections.Generic;

namespace API.Services
{
    public interface IFeatureService
    {
        IEnumerable<Feature> ReadFeatures(string features);
        Feature ReadFeature(string feature);
        string UnreadFeatures(List<Feature> features);
        string UnreadFeature(Feature features);
        IEnumerable<string> GetSections();
        Dictionary<string, List<string>> GetTypes();
        Dictionary<string, List<string>> GetTypesForRequirements();
    }

    public class FeatureService : IFeatureService
    {

        public FeatureService()
        {
        }

        public IEnumerable<Feature> ReadFeatures(string features)
        {
            //feature = "SavingThrow!Strength!2!Character;level;18!?Ability!Strength!1!!";
            var readedFeatures = new List<Feature>();

            if (string.IsNullOrEmpty(features))
                return null;
            //Split each feature
            var splittedFeature = features.Split('?');

            //Now split and create a feature object with each splitted item
            for (int i = 0; i < splittedFeature.Length; i++)
            {
                var itemSplitted = splittedFeature[i].Split('!');
                var newFeature = new Feature
                {
                    Section = itemSplitted[0],
                    Type = itemSplitted[1],
                    Value = itemSplitted[2],
                    Note = itemSplitted[3],
                    Requirements = new List<Requirement>()
                };

                 //split requirements
                if (!string.IsNullOrEmpty(itemSplitted[4]))
                {
                    var requirementsSplitted = itemSplitted[4].Split(':');
                    for (int q = 0; q < requirementsSplitted.Length; q++)
                    {
                        var requirementSplitted = requirementsSplitted[q].Split(';');
                        var newRequirement = new Requirement
                        {
                            Section = requirementSplitted[0],
                            Type = requirementSplitted[1],
                            Value = requirementSplitted[2]
                        };
                        newFeature.Requirements.Add(newRequirement);
                    }
                }
                readedFeatures.Add(newFeature);

            }

            return readedFeatures;

        }

        public Feature ReadFeature(string feature)
        {
            if (string.IsNullOrEmpty(feature))
                return null;

            var featureSplitted = feature.Split('!');
            var newFeature = new Feature
            {
                Section = featureSplitted[0],
                Type = featureSplitted[1],
                Value = featureSplitted[2],
                Note = featureSplitted[3],
                Requirements = new List<Requirement>()
            };

            //split requirements
            if (!string.IsNullOrEmpty(featureSplitted[4]))
            {
                var requirementsSplitted = featureSplitted[4].Split(':');
                for (int q = 0; q < requirementsSplitted.Length; q++)
                {
                    var requirementSplitted = requirementsSplitted[q].Split(';');
                    var newRequirement = new Requirement
                    {
                        Section = requirementSplitted[0],
                        Type = requirementSplitted[1],
                        Value = requirementSplitted[2]
                    };
                    newFeature.Requirements.Add(newRequirement);
                }
            }

            return newFeature;

        }

        public string UnreadFeatures(List<Feature> features)
        {
            if (features == null)
                return String.Empty;
            var listString = new List<string>();
            for (int i = 0; i < features.Count; i++)
            {
                var str = features[i].Section + "!" + features[i].Type + "!" + features[i].Value + "!" + features[i].Note + "!";
                if (features[i].Requirements != null)
                {
                    var requirementsListString = new List<string>();
                    for (int q = 0; q < features[i].Requirements.Count; q++)
                    {
                        var requirementStr = features[i].Requirements[q].Section + ";" + features[i].Requirements[q].Type + ";" + features[i].Requirements[q].Value;
                        requirementsListString.Add(requirementStr);
                    }
                    str += String.Join(':', requirementsListString);
                    str += "!";
                }
                else
                    str += "!";
                listString.Add(str);
            }

            return String.Join('?', listString);
        }

        public string UnreadFeature(Feature feature)
        {
            if (feature == null)
                return String.Empty;
            var str = feature.Section + "!" + feature.Type + "!" + feature.Value + "!" + feature.Note + "!";
            if (feature.Requirements != null)
            {
                var requirementsListString = new List<string>();
                for (int q = 0; q < feature.Requirements.Count; q++)
                {
                    var requirementStr = feature.Requirements[q].Section + ";" + feature.Requirements[q].Type + ";" + feature.Requirements[q].Value;
                    requirementsListString.Add(requirementStr);
                }
                str += String.Join(':', requirementsListString);
                str += "!";
            }
            else
                str += "!";

            return str;
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
