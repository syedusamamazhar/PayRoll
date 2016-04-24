using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PayRoll.WebApplication.Startup))]
namespace PayRoll.WebApplication
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
