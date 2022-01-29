namespace API.Models.Character
{
    public class Character
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Class { get; set; }
        public string Race { get; set; }
        public bool HasImage { get; set; }
        public string Username { get; set; }
    }
}
