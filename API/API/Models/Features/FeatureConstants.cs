using System.Collections.Generic;

namespace API.Models.Features
{
    public static class FeatureConstants
    {
        public readonly static List<string> Sections = new List<string>()
        {
            "Character",
            "Saving Throw",
            "Ability",
            "Skill",
            "Trait",
            "Condition",
            "Defense",
            "Sense",
            "Spell",
            "Item"
        };

        public readonly static Dictionary<string, List<string>> Types = new Dictionary<string, List<string>>()
        {
            {"Character", new List<string> {"Level", "Max Health", "Max Mana", "Armor Class", "Initiative", "Proficiency", "Speed", "Armor Proficiency", "Weapon Proficiency", "Language", "Tool" } },
            {"Saving Throw", new List<string> {"Strength", "Dexterity", "Constitution", "Wisdom", "Charisma", "Intelligence", "Advantage", "Disadvantage" } },
            {"Ability", new List<string> { "Strength", "Dexterity", "Constitution", "Wisdom", "Charisma", "Intelligence" } },
            {"Item", new List<string> {"Gain", "Lose"} },
            {"Spell", new List<string> {"Gain", "Lose"} },
            {"Trait", new List<string> {"Gain", "Lose"} },
            {"Skill", new List<string> { "Athletics", "Acrobatics", "Sleight of Hand", "Stealth", "Arcana", "History", "Investigation", "Nature", "Religion", "Animal Handling", "Insight", "Medicine", "Perception", "Survival","Deception", "Intimidation", "Performance", "Persuasion" } },
            {"Sense", new List<string> {"Passive Perception", "Passive Investigation", "Passive Insight"} },
            {"Condition", new List<string> {"Gain", "Lose"} },
            {"Defense", new List<string> {"Gain", "Lose" } },
        };

        public readonly static Dictionary<string, List<string>> TypesForRequirements = new Dictionary<string, List<string>>()
        {
            {"Character", new List<string> {"Level", "Max Health", "Max Mana", "Armor Class", "Initiative", "Proficiency", "Speed", "Armor Proficiency", "Weapon Proficiency", "Language", "Tool" } },
            {"Saving Throw", new List<string> {"Strength", "Dexterity", "Constitution", "Wisdom", "Charisma", "Intelligence", "Advantage", "Disadvantage" } },
            {"Ability", new List<string> { "Strength", "Dexterity", "Constitution", "Wisdom", "Charisma", "Intelligence" } },
            {"Item", new List<string> {"Check"} },
            {"Spell", new List<string> {"Check"} },
            {"Trait", new List<string> {"Check"} },
            {"Skill", new List<string> { "Athletics", "Acrobatics", "Sleight of Hand", "Stealth", "Arcana", "History", "Investigation", "Nature", "Religion", "Animal Handling", "Insight", "Medicine", "Perception", "Survival","Deception", "Intimidation", "Performance", "Persuasion" } },
            {"Sense", new List<string> {"Passive Perception", "Passive Investigation", "Passive Insight"} },
            {"Condition", new List<string> {"Check"} },
            {"Defense", new List<string> {"Check" } },
        };
    }
}
