

using System.Threading.Tasks;
using ChurchWeb.Domain.Entities;

namespace ChurchWeb.Domain.Services
{
    public interface IAppointmentService
    {
        Task<Appointment> Save(Appointment model);

        Task Delete(int id);
    }
}