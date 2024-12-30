import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Pencil, Upload, Save } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const EditOrganizator = () => {
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150");
  const [editableField, setEditableField] = useState(null);
  const [formData, setFormData] = useState({
    organizatorName: "John Doe",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    companyName: "TechCorp Ltd.",
    password: "",
    confirmEmail: "john.doe@example.com"
  });

  const handleProfilePicClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfilePic(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const renderField = (fieldName, label, type = "text", placeholder) => (
    <div className="relative space-y-2">
      <Label className="font-medium">{label}</Label>
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          value={formData[fieldName]}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          className={`pr-10 ${
            editableField === fieldName ? "border-primary" : ""
          }`}
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
          onClick={() => setEditableField(fieldName)}
        >
          <Pencil className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10" >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Section */}
        <div className="flex items-start space-x-6">
          <div className="space-y-2">
            <Label className="font-medium">Profile Picture</Label>
            <div className="relative group">
              <Avatar className="h-24 w-24 cursor-pointer">
                <AvatarImage src={profilePic} alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleProfilePicClick}
              >
                <Upload className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            {renderField("organizatorName", "Organizator Name", "text", "Enter organizator name")}
            {renderField("email", "Email Address", "email", "Enter email")}
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-4">
          {renderField("firstName", "First Name", "text", "Enter first name")}
          {renderField("lastName", "Last Name", "text", "Enter last name")}
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-2 gap-4">
          {renderField("companyName", "Company Name", "text", "Enter company name")}
          {renderField("password", "Password", "password", "Enter password")}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button className="space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditOrganizator;