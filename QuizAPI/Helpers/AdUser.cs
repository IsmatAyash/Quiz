using System;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace QuizAPI.Helpers
{
    public class AdUser
    {
        public string Name { get; set; }
        public string GivenName { get; set; }
        public string Surname { get; set; }
        public string EmailAddress { get; set; }
        public string DistinguishedName { get; set; }
        public string SamAccountName { get; set; }
        public string EmployeeId { get; set; }
        public string VoiceTelephoneNumber { get; set; }

        public static AdUser CastToAdUser(UserPrincipal user)
        {
            return new AdUser
            {
                Name = user.Name,
                GivenName = user.GivenName,
                Surname = user.Surname,
                EmailAddress = user.EmailAddress,
                DistinguishedName = user.DistinguishedName,
                SamAccountName = user.SamAccountName,
                VoiceTelephoneNumber = user.VoiceTelephoneNumber,
                EmployeeId = user.EmployeeId
            };
        }

        public string GetDomainPrefix() => DistinguishedName
            .Split(',')
            .FirstOrDefault(x => x.ToLower().Contains("dc"))
            .Split('=')
            .LastOrDefault()
            .ToUpper();
    }
}
