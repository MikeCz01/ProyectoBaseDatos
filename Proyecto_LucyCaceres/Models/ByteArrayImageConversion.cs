using HeyRed.Mime;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;


namespace Proyecto_LucyCaceres.Models
{
    public class ByteArrayImageConversion
    {
        public readonly string ContenType;
        public readonly byte[] ContentByteArray;
        public readonly string Extension;
        public readonly bool IsSuccesful;
        public ByteArrayImageConversion(string base64String)
        {
            string[] base64StringArrayCommaSplit = base64String.Split(',');
            if (base64StringArrayCommaSplit.Length < 2)
            {
                IsSuccesful = false;
                return;
            }
            string b64Metadadata = base64StringArrayCommaSplit[0];
            string b64Content = base64StringArrayCommaSplit[1];
            try
            {
                ContenType = b64Metadadata.Split(';')[0].Split(':')[1];
                Extension = MimeTypesMap.GetExtension(ContenType);
            }
            catch (Exception e) { Debug.WriteLine(e); }
            try
            {
                ContentByteArray = Convert.FromBase64String(b64Content);
                IsSuccesful = true;
            }
            catch
            {
                IsSuccesful = false;
                return;
            }
        }
    }
}