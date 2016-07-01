using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChurchWeb.Domain.Entities;
using ChurchWeb.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ChurchWeb.Data.Repository
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly ChurchDbContext _context;

        public AppointmentRepository(ChurchDbContext context)
        {
            _context = context;
        }

        public async Task<Appointment> Find(int id, int churchId)
        {
            return await _context.Appointments
                .Where(x => x.Id == id && x.ChurchId == churchId)
                .SingleOrDefaultAsync();
        }

        public async Task<List<Appointment>> List(int churchId)
        {
            return await _context.Appointments
                .Where(x=> x.ChurchId == churchId)
                .ToListAsync();
        }

        public async Task<Appointment> Create(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return appointment;
        }

        public async Task<Appointment> Update(Appointment appointment)
        {
            await _context.SaveChangesAsync();
            return appointment;
        }

        public async Task Delete(Appointment appointment)
        {
            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();
        }
    }
}