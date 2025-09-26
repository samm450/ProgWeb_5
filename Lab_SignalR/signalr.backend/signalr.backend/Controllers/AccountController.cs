using signalr.backend.Data;
using signalr.backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace signalr.backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        readonly UserManager<IdentityUser> UserManager;
        readonly ApplicationDbContext _context;
        readonly SignInManager<IdentityUser> SignInManager;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, ApplicationDbContext context)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<LoginResultDTO>> Register(RegisterDTO register)
        {
            if (register.Password != register.PasswordConfirm)
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new { Message = "Les deux mots de passe spécifiés sont différents." });
            }
            IdentityUser user = new IdentityUser()
            {
                UserName = register.Email,
                Email = register.Email
            };
            IdentityResult identityResult = await this.UserManager.CreateAsync(user, register.Password);
            if (!identityResult.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Message = "La création de l'utilisateur a échoué." });
            }
            return await Login(new LoginDTO() { Password = register.Password, Email = register.Email });
        }

        [HttpPost]
        public async Task<ActionResult<LoginResultDTO>> Login(LoginDTO login)
        {
            var result = await SignInManager.PasswordSignInAsync(login.Email, login.Password, true, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                Claim? nameIdentifierClaim = User.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

                // Note: On ajoute simplement le NameIdentifier dans les claims. Il n'y aura pas de rôle pour les utilisateurs du WebAPI.
                List<Claim> authClaims = new List<Claim>();
                authClaims.Add(nameIdentifierClaim);

                SymmetricSecurityKey signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("C'est tellement la meilleure cle qui a jamais ete cree dans l'histoire de l'humanite (doit etre longue)"));

                string issuer = this.Request.Scheme + "://" + this.Request.Host;

                DateTime expirationTime = DateTime.Now.AddMinutes(30);

                JwtSecurityToken token = new JwtSecurityToken(
                    issuer: issuer,
                    audience: null,
                    claims: authClaims,
                    expires: expirationTime,
                    signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature)
                );

                string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                return Ok(new LoginResultDTO() { Email = login.Email, Token = tokenString });
            }

            return NotFound(new { Error = "L'utilisateur est introuvable ou le mot de passe de concorde pas" });
        }

        [Authorize]
        [HttpGet]
        public ActionResult<string[]> Test()
        {
            return new string[] { "figue", "banane", "noix" };
        }
    }
}
