﻿using Doshboard.Backend.Entities.Widget;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Numerics;

namespace Doshboard.Backend.Entities
{
    public enum WidgetType
    {
        CityTemp
    }

    public abstract class AWidget
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; private init; } = ObjectId.GenerateNewId().ToString();

        public int X { get; set; } = 0;
        public int Y { get; set; } = 0;
        public int Height { get; set; }
        public int Width { get; set; }
        public WidgetType Type { get; set; }

        public Dictionary<string, object> Params { get; set; } = new();

        public AWidget(WidgetType type, int height, int width)
        { 
            Type = type;
            Height = height;
            Width = width;
        }
    }
}
