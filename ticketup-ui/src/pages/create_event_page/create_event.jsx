import GradientButton from "../../components/gradientButton/gradientButton";
import Footer from "../../components/footer/footer";
import EmptyBox from "../../components/empty_box/empty_box";
import "./create_event.css";
import { useState } from "react";

const CreateEvent = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async() => {
    
  }

  return (
    <div className="create-wrapper">
      <div className="create-top-bar">
        <div className="create-box left-box">
          <img src="../../assets/icons/ticketUp-logo.svg" alt="Left Logo" className="create-box-logo" />
        </div>
        <div className="create-head-text">ORGANİZATOR PANELİ</div>
      </div>
      <div className="create-container">
        <div className="create-center-text">
          Etkinlik Oluştur
        </div>
        <div className="create-buttons-container">
          <div className="create-line"></div>
          <div className="create-button">
            <div className="create-button-circle active"></div>
          </div>
          <div className="create-line"></div>
          <div className="create-button">
            <div className="create-button-circle"></div>
          </div>
          <div className="create-line"></div>
        </div>
        <div className="create-event-details">
          <EmptyBox width="175px" height="75px" />
          <div className="create-left-text">
            Etkinlik Detayları
          </div>
        </div>
        <div className="create-event-details">
          <div className="create-left-text-container">
            <div className="create-event-title">
              Etkinlik Başlığı <span>*</span>
            </div>
          </div>
          <div className="create-input-container">
            <input
              type="text"
              className="create-input"
              placeholder="Etkinliğin adını giriniz"
            />
          </div>
          <EmptyBox width="175px" height="75px" />
        </div>
        <EmptyBox width="175px" height="75px" />
        <div className="create-event-details">
          <EmptyBox width="175px" height="75px" />
          <div className="create-left-text">
            Tarih & Saat
          </div>
        </div>
        <div className="create-event-details">
          <div className="create-left-text-container">
            <div className="create-event-title">
              Seanslar <span>*</span>
            </div>
          </div>
          <div className="create-dates-container">
            <div className="create-date-container">
              <div className="create-date-title">
                Başlangıç Tarihi <span>*</span>
              </div>
              <input
                type="date"
                className="create-date-input"
              />
            </div>
            <div className="create-date-container">
              <div className="create-date-title">
                Başlangıç Saati <span>*</span>
              </div>
              <input
                type="time"
                className="create-date-input"
              />
            </div>
            <div className="create-date-container">
              <div className="create-date-title">
                Bitiş Saati
              </div>
              <input
                type="time"
                className="create-date-input"
              />
            </div>
          </div>
          <EmptyBox width="175px" height="75px" />
        </div>
        <EmptyBox width="175px" height="75px" />
        <div className="create-event-details">
          <EmptyBox width="175px" height="75px" />
          <div className="create-left-text">
            Konum
          </div>
        </div>
        <div className="create-event-details">
          <div className="create-left-text-container">
            <div className="create-event-title">
              Etkinlik Nerede Olacak? <span>*</span>
            </div>
          </div>
          <div className="create-dropdown-container">
            <select className="create-dropdown-select">
              <option value="istanbul">istanbul</option>
              <option value="istanbul">istanbul</option>
              <option value="istanbul">istanbul</option>
              <option value="istanbul">istanbul</option>
            </select>
          </div>
          <EmptyBox width="175px" height="75px" />
        </div>
        <div className="create-event-details">
          <div className="create-left-text-container">
            <div className="create-event-title">
              Haritadan Seçilecek <span>*</span>
            </div>
          </div>
          <div className="create-input-container">
            <input
              type="text"
              className="create-input"
              placeholder="Koordinat Giriniz"
            />
          </div>
          <EmptyBox width="175px" height="75px" />
        </div>
        <EmptyBox width="175px" height="75px" />
        <div className="create-event-details">
          <EmptyBox width="175px" height="75px" />
          <div className="create-left-text">
            Açıklama
          </div>
        </div>
        <div className="create-event-details">
          <div className="create-left-text-container">
            <div className="create-event-title">
              Etkinlik Hakkında <span>*</span>
            </div>
          </div>
          <div class="create-large-input-container">
            <textarea
              class="create-large-input"
              placeholder="Etkinliğinizi tanıtın"
            ></textarea>
          </div>
          <EmptyBox width="175px" height="75px" />
        </div>
        <EmptyBox width="175px" height="75px" />
        <div className="create-button-container">
          <GradientButton text="Biletini Sorgula" onClick={() => { }} />
          <EmptyBox width="175px" height="40px" />
        </div>
        <EmptyBox width="175px" height="75px" />
        <div className="create-event-details">
          <div className="create-left-text">
            Görüntü Yükle
          </div>
        </div>
        <div class="create-file-upload-container">
          <label class="create-file-upload-button" for="file-input">
            Dosya Seç
          </label>
          <input type="file" id="file-input" class="create-file-input" />
          <div class="create-file-upload-text">
            Görüntü yüklemek için bir dosya seçin
          </div>
        </div>


      </div>
      <Footer />
    </div>
  );
};

export default CreateEvent;
