using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Application.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Application.BackgroundServices
{
    public class CleanExpiredBookingsService : BackgroundService
    {
        private readonly ILogger<CleanExpiredBookingsService> _logger;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public CleanExpiredBookingsService(ILogger<CleanExpiredBookingsService> logger,IServiceScopeFactory serviceScopeFactory)
        {
            _logger = logger;
            _serviceScopeFactory = serviceScopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var timer = new PeriodicTimer(TimeSpan.FromMinutes(5));

            while (!stoppingToken.IsCancellationRequested)
            {
                await timer.WaitForNextTickAsync(stoppingToken);
                try
                {
                    using (var scope = _serviceScopeFactory.CreateScope())
                    {
                        var scopedBookingService = scope.ServiceProvider.GetRequiredService<IBookingService>();
                        await scopedBookingService.CleanExpiredBookingsAsync();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Đã xảy ra lỗi khi làm sạch các booking hết hạn.");
                }
            }
        }
    }
}
