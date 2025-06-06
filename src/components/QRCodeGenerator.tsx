
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, User, Hash, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const QRCodeGenerator = () => {
  const [name, setName] = useState('Srimun Sathish');
  const [uniqueId, setUniqueId] = useState('0177cs241045');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      const data = `Name: ${name}\nUnique ID: ${uniqueId}`;
      const url = await QRCode.toDataURL(data, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [name, uniqueId]);

  const copyToClipboard = async () => {
    const data = `Name: ${name}\nUnique ID: ${uniqueId}`;
    try {
      await navigator.clipboard.writeText(data);
      toast({
        title: "Copied!",
        description: "QR code data copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `qr-code-${uniqueId}.png`;
      link.href = qrCodeUrl;
      link.click();
      toast({
        title: "Downloaded!",
        description: "QR code saved to your device.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            QR Code Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Generate a personalized QR code with your information
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uniqueId" className="text-sm font-medium text-gray-700">
                  Unique ID
                </Label>
                <Input
                  id="uniqueId"
                  value={uniqueId}
                  onChange={(e) => setUniqueId(e.target.value)}
                  placeholder="Enter your unique ID"
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-700 mb-2">QR Code Data:</h4>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4" />
                    <span className="font-medium">Name:</span> {name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    <span className="font-medium">Unique ID:</span> {uniqueId}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <QrCode className="w-5 h-5" />
                Generated QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="flex justify-center">
                {isGenerating ? (
                  <div className="w-72 h-72 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : qrCodeUrl ? (
                  <div className="p-4 bg-white rounded-xl shadow-lg">
                    <img
                      src={qrCodeUrl}
                      alt="Generated QR Code"
                      className="w-64 h-64 mx-auto"
                    />
                  </div>
                ) : (
                  <div className="w-72 h-72 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                    No QR code generated
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Copy className="w-4 h-4" />
                  Copy Data
                </Button>
                <Button
                  onClick={downloadQRCode}
                  disabled={!qrCodeUrl}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Download className="w-4 h-4" />
                  Download QR
                </Button>
              </div>

              <p className="text-sm text-gray-500">
                Scan this QR code with any QR scanner to view the encoded information
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">How it works</h3>
              <p className="text-blue-100">
                This QR code contains your name and unique ID. When scanned, it will display your information 
                exactly as you've entered it above.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
