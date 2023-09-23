using Application.Services.Authentication;
using Data.Attributes;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace API.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            BaseServiceRegister<SingletonAttribute>(services, ServiceLifetime.Singleton);
            BaseServiceRegister<ScopedAttribute>(services, ServiceLifetime.Scoped);
            BaseServiceRegister<TransientAttribute>(services, ServiceLifetime.Transient);

            return services;
        }

        private static void BaseServiceRegister<T>(IServiceCollection services, ServiceLifetime serviceLifetime) where T : Attribute
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies().SelectMany(q => q.GetTypes()).Where(t => t.CustomAttributes.Any(k => k.AttributeType == typeof(T)));
            foreach (var assembly in assemblies)
            {
                var typeInterfaces = assembly.GetInterfaces();
                foreach (var typeInterface in typeInterfaces)
                {
                    var serviceDescriptor = new ServiceDescriptor(typeInterface, assembly, serviceLifetime);
                    services.Add(serviceDescriptor);
                }

            }
        }
    }
}