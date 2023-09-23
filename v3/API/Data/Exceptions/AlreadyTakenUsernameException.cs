namespace Data.Exceptions
{
    public class AlreadyTakenUsernameException : Exception
    {
        public AlreadyTakenUsernameException()
        {
        }

        public AlreadyTakenUsernameException(string message)
            : base(message)
        {
        }
    }
}
