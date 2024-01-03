import axios from "axios";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const PdfToSpeech = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [download, setDownload] = useState("");

  const [firstDropdownValue, setFirstDropdownValue] = useState("");
  const [secondDropdownValue, setSecondDropdownValue] = useState("");

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const initializePdfjs = async () => {
    try {
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
      return pdfjsLib;
    } catch (error) {
      console.error("Error initializing pdfjs:", error);
      throw error;
    }
  };

  const countPagesInPDF = async (selectedFile) => {
    try {
      const pdfjsLib = await initializePdfjs();
      if (!pdfjsLib || !selectedFile) return 0;

      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          const typedArray = new Uint8Array(reader.result);

          try {
            const loadingTask = pdfjsLib.getDocument({ data: typedArray });
            const pdf = await loadingTask.promise;

            const pageCount = pdf.numPages;
            resolve(pageCount);
          } catch (error) {
            console.error("Error reading PDF:", error);
            reject(error);
          }
        };

        reader.onerror = (error) => {
          console.error("FileReader error:", error);
          reject(error);
        };

        if (selectedFile instanceof Blob) {
          reader.readAsArrayBuffer(selectedFile);
        } else {
          console.error("Invalid file type");
          reject(new Error("Invalid file type"));
        }
      });
    } catch (error) {
      console.error("Error initializing PDF.js:", error);
      throw error;
    }
  };

  const Navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["Authtoken"]);
  const [credits, setcredits] = useState(0);


  useEffect(() => {
    const fetchCredits = async () => {
      const userId = cookies.userId;
      try {
        const res = await fetch("/api/get-credits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        });
        if (res.status === 200) {
          const data = await res.json();
          setcredits(data.credits);
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    const intervalId = setInterval(fetchCredits, 2000);

    return () => clearInterval(intervalId);
  }, [cookies.userId]);

  const convertPdfToSpeech = async (e) => {
    e.preventDefault();
    const selectedFile = pdfFile;
    setPdfFile(selectedFile);

    const pageCount = await countPagesInPDF(selectedFile);
    if(!cookies.userId || !cookies.Authtoken) {
      toast.error("Please Login or Register")
    }
    else if (credits < 5) {
      toast.error(
        "Insufficient credits, credits must be greater or equal to 5"
      );
      return;
    } else if (pageCount > 2) {
      toast.error("PDF page count must be less than or equal to 2");
      setPdfFile(null);
    } else if (!pdfFile) {
      toast.error("Please select a PDF file");
    } else if (!firstDropdownValue) {
      toast.error("Please select a Language ");
    } else if (!secondDropdownValue) {
      toast.error("Please select a Gender ");
    } else {
      try {
        toast.loading("Converting...");
        const formData = new FormData();
        formData.append("pdf", pdfFile);
        formData.append("lang", firstDropdownValue);
        formData.append("gender", secondDropdownValue);

        const response = await axios.post(
          "/api/pdf-to-speech",

          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.dismiss();

          if (response.data.message.google.provider_status_code === 400) {
            toast.error(
              "There is an Error in your PDF File. Please change the file"
            );
          } else if (response.data.message.google.status === "success") {
            setDownload(response.data.message.google.audio_resource_url);
            const res = await fetch("/api/deduct-credits", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId: cookies.userId, amount: 5 }),
            });
            if (res.status === 200) {
              setcredits(credits - 5);
            } else {
              toast.error("Failed to deduct credits");
            }
            toast.success("Converted PDF to Speech Successfuly");
          }
        } else {
          toast.error("Failed to convert PDF to speech");
        }
      } catch (error) {
        toast.dismiss();

        toast.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFirstDropdownChange = (event) => {
    setFirstDropdownValue(event.target.value);
  };

  const handleSecondDropdownChange = (event) => {
    setSecondDropdownValue(event.target.value);
  };

  const handleDownload = () => {
    if (download) {
      const link = document.createElement("a");
      link.href = download;
      link.setAttribute("download", "translated_document.pdf");
      document.body.appendChild(link);
      link.click();
    }
  };
  return (
    <>
      <Toaster />

      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12 ">
        <div className="w-full max-w-[58rem] bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 sm:p-4 lg:p-6 ">
          <div className="p-6 space-y-4 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center ">
              PDF TO SPEECH
            </h1>

            <form className="space-y-4" onSubmit={convertPdfToSpeech}>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                ></p>
              </div>
              <div className="flex justify-center">
                <select
                  value={firstDropdownValue}
                  onChange={handleFirstDropdownChange}
                  className="bg-slate-600 text-white border-2  p-2 m-2 rounded-md focus:outline-none focus:border-gray-600"
                >
                  <option selected>Language</option>

                  <option value="ar">Arabic</option>

                  <option value="bg">Bulgarian</option>

                  <option value="zh">Chinese</option>
                  <option value="cs">Czech</option>
                  <option value="da">Danish</option>
                  <option value="nl">Dutch</option>
                  <option value="en">English</option>

                  <option value="fr">French</option>
                  <option value="ja">Japnease</option>

                  <option value="de">German</option>
                  <option value="hi">Hindi</option>
                  <option value="id">Indonesian</option>
                  <option value="ga">Irish</option>
                  <option value="it">Italian</option>

                  <option value="ko">Korean</option>
                  <option value="cmn">Mandarin Chinese</option>
                  <option value="el">Modern Greek (1453-)</option>

                  <option value="fa">Persian</option>
                  <option value="pl">Polish</option>
                  <option value="pt">Portuguese</option>
                  <option value="ro">Romanian</option>
                  <option value="ru">Russian</option>
                  <option value="sr">Serbian</option>

                  <option value="es">Spanish</option>
                  <option value="sv">Swedish</option>
                  <option value="th">Thai</option>
                  <option value="tr">Turkish</option>
                  <option value="uk">Ukrainian</option>
                  <option value="uz">Uzbek</option>
                  <option value="vi">Vietnamese</option>
                </select>

                <select
                  value={secondDropdownValue}
                  onChange={handleSecondDropdownChange}
                  className="bg-slate-600 text-white border-2 p-2 m-2 rounded-md focus:outline-none focus:border-gray-600"
                >
                  <option selected>Gender</option>

                  <option value="FEMALE">FEMALE</option>
                  <option value="MALE">MALE</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-300 hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Convert To Speech
              </button>

              {download && (
                <>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="bg-green-400 rounded-md w-full text-white py-2"
                  >
                    Download MP3
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default PdfToSpeech;
