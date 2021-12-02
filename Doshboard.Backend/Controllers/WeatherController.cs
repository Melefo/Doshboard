﻿using Doshboard.Backend.Entities;
using Doshboard.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Doshboard.Backend.Controllers
{
    [Authorize]
    [Route("services/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherService _service;

        public WeatherController(WeatherService service) =>
            _service = service;

        [HttpGet("city_temperature")]
        public async Task<ActionResult<WeatherData>> GetCityTemperature([Required]int id)
        {
            WeatherData? response = await _service.GetCityTemp(User.Identity!.Name!, id);

            if (response == null)
                return BadRequest();
            return response;
        }

        [HttpPost("city_temperature")]
        public void ConfigureCityTemperature([Required]int id, string? city, UnitType? unit) => 
            _service.ConfigureCityTemp(User.Identity!.Name!, id, city, unit);
    }
}