using System.Collections.Generic;
using System.Threading.Tasks;
using ChurchWeb.Domain.Entities;

namespace ChurchWeb.Domain.Repositories
{
    public interface IAppointmentRepository
    {
        Task<Appointment> Find(int id, int churchId);

        Task<List<Appointment>> List(int churchId);

        Task<Appointment> Create(Appointment appointment);

        Task<Appointment> Update(Appointment appointment);

        Task Delete(Appointment appointment);
    }
}