import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Pencil, Upload, Save } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditOrganizator = ({setActiveItem}) => {
  const [editableField, setEditableField] = useState(null);
  const [formData, setFormData] = useState({
    organizatorName: "",
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    password: "",
    profilePic: "",
    
  });

  const token = sessionStorage.getItem("token");
  const parsedToken = token ? jwtDecode(token): null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizerData = async () => {
      try{
        const response = await axios.get(`http://46.101.166.170:8080/ticketup/organizators/list/${parsedToken.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const organizator = response.data;

        setFormData({
          organizatorName: `${organizator.name || ""} ${organizator.surname || ""}`,
          email: organizator.email || "",
          firstName: organizator.name || "",
          lastName: organizator.surname || "",
          companyName: organizator.organizationName || "",
          password: "",
          profilePic: organizator.profilePicture || "",
        });

      }catch(error){
        console.error("Veri çekilirken hata oluştu", error);
        toast.error("Organizatör bilgileri alınamadı. Lütfen Yeniden giriş yapın");
        navigate("/login");
      }
    };

    fetchOrganizerData();
  },[token]);

  const handleProfilePicClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData((prev) => ({
            ...prev,
            profilePic: e.target.result
          }));
        };
        reader.readAsDataURL(file);

        setFormData((prev) => ({
          ...prev,
          temporaryFile: file, // Sunucuya yüklemek için dosyayı kaydet
        }));
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

  const handleSaveChanges = async () => {
    try{
      const {temporaryFile, password,  ...otherData} = formData;
      let uploadedUrl = formData.profilePic;

      if(temporaryFile){
        const formDataToUpload = new FormData();
        formDataToUpload.append("file", temporaryFile);

        const response = await axios.post(
          "http://46.101.166.170:8080/ticketup/files/upload-pp",
          formDataToUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token},`
            },
          }
        );

        const data = response.data;
        uploadedUrl = data.url;
      }

      

      console.log(otherData.password || "pasword is null");
      const passwordToSend = password ? password: null;
      

       await axios.put(
         `http://46.101.166.170:8080/ticketup/organizators/update/${parsedToken.id}`, {
           name: otherData.firstName,
           surname: otherData.lastName,
           organizationName: otherData.companyName,
           email: otherData.email,
           passwordHash: passwordToSend,
           profilePicture: uploadedUrl,
         },
         {
           headers: {
             Authorization: `Bearer ${token}`,
             "Content-Type": "application/json",
          }
        }
      )



      toast.success("Değişiklikler Başarıyla Kaydedildi.");
    }catch(error){
      console.error("Kaydetme Sırasında Bir Hata Oluştu:",error);
      toast.error("Değişiklikler Kaydedilirken Bir Hata Oluştu. Lütfen Tekrar Deneyin");
    }
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
        <CardTitle className="text-2xl font-bold">Profili Düzenle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Section */}
        <div className="flex items-start space-x-6">
          <div className="space-y-2">
            <Label className="font-medium">Profil Resmi</Label>
            <div className="relative group">
              <Avatar className="h-24 w-24 cursor-pointer">
                <AvatarImage src={formData.profilePic ||  "/src/assets/icons/upload_pp.svg"} alt="Profile" />
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
            {renderField("organizatorName", "Organizator Adı", "text", "Lütfen Organizator Adınızı Giriniz")}
            {renderField("email", "Email Adresiniz", "email", "Lütfen Email Adresinizi Giriniz")}
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-4">
          {renderField("firstName", "Adı", "text", "Lütfen Adınızı Giriniz")}
          {renderField("lastName", "Soyadı", "text", "Lütfen Soyadınızı Giriniz")}
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-2 gap-4">
          {renderField("companyName", "Organizasyon Adı", "text", "Lütfen Organizasyon Adınızı Giriniz")}
          {renderField("password", "Şifreniz", "password", "Şifreninizi Giriniz")}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
        <Button className="space-x-2" onClick={handleSaveChanges}>
            <Save className="h-4 w-4" />
            <span>Değişikleri Kaydet</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditOrganizator;