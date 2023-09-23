namespace Data.Exceptions
{
    public class AlreadyTakenEmailException : Exception
    {
        public AlreadyTakenEmailException()
        {
        }

        public AlreadyTakenEmailException(string message)
            : base(message)
        {
        }
    }
}
