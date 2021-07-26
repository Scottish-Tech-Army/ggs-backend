using System.ComponentModel.DataAnnotations;

namespace GirlGuidingScotland.API.Models
{
    public class MockPerson
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
    }
}
