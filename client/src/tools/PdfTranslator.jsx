import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


const PdfTranslator = () => {
  const [file, setFile] = useState(null);
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [translationResult, setTranslationResult] = useState("");
  const [download, setDownload] = useState("");
  const [numPages, setNumPages] = useState(0);

  const handleFirstDropdownChange = (event) => {
    setSourceLanguage(event.target.value);
  };

  const handleSecondDropdownChange = (event) => {
    setTargetLanguage(event.target.value);
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
            console.log("Number of pages:", pageCount);
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
  const Navigate = useNavigate()

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


  const handleTranslate = async (e) => {
    e.preventDefault();
    const selectedFile = file;
    setFile(selectedFile);

    const pageCount = await countPagesInPDF(selectedFile);
    if(!cookies.userId || !cookies.Authtoken) {
      toast.error("Please Login or Register")
    }
    else if (credits < 7) {
      toast.error("Insufficient credits, credits must be greater or equal to 7");
      return;
    }
     else if (pageCount > 4) {
      toast.error("PDF page count must be less than or equal to 4");
      setFile(null);
    } else if (!file || !sourceLanguage || !targetLanguage) {
      toast.error("Please Fill All The required Fields!")
    
    }else if(sourceLanguage === ""  ){
      toast.error("Please your's PDF language!")
    }else if( targetLanguage === "" ){
      toast.error("Please Language for PDF Translation!")
    }
     else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("providers", "google");
      formData.append("sourceLanguage", sourceLanguage);
      formData.append("targetLanguage", targetLanguage);

      try {
        setTimeout(() => {
          toast.loading("Translating PDF...");
        }, 1000);
        const response = await axios.post(
          "/api/translate-pdf",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.dismiss();
          toast.success("Translated PDF successfully");


          setTranslationResult(JSON.stringify(response.data));
          setDownload(response.data.google.document_resource_url);
          const res = await fetch("/api/deduct-credits", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: cookies.userId, amount: 7 }),
          });
          if (res.status === 200) {
              setcredits(credits - 7);
            } else {
              toast.error("Failed to deduct credits");
            }
        } else {
          toast.error("Thre was an error in Translaing PDF!");
        }
      } catch (error) {
        toast.error("Server Error");

        console.error("Error occurred during translation:", error);
      }
    }
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
    <div>
      <Toaster />
      <Helmet>
        <title>GenetiCraft | AI Powered PDF TRANSLATION</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Translate PDF documents seamlessly with GenetiCraft's AI-powered PDF translation tool. Convert PDFs to your desired language effortlessly."
        />
        <link rel="canonical" href="https://www.geneticraft.fun/translate-pdf" />
      </Helmet>

<<<<<<< HEAD
=======
{/* <<<<<<< HEAD
=======
>>>>>>> temp-branch
      

>>>>>>> 8f458aa (Minor fixes) */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white justify-center flex">
                PDF TRANSLATOR
              </h1>
              <div>
                <Toaster />
              </div>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleTranslate}
              >
                <div>
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <p
                    class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    PDF (MAX PDF PAGES. 5)
                  </p>
                </div>
                <label
                  for="language"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your PDF Language
                </label>
                <select
                  id="language"
                  value={sourceLanguage}
                  onChange={handleFirstDropdownChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {/* <option selected>Select PDF Source Language</option> */}
                  <option value="">Select Language</option>

                  <option value="auto-detect">Auto detection</option>
                  <option value="af">Afrikaans</option>
                  <option value="sq">Albanian</option>
                  <option value="am">Amharic</option>
                  <option value="ar">Arabic</option>
                  <option value="hy">Armenian</option>
                  <option value="az">Azerbaijani</option>
                  <option value="eu">Basque</option>
                  <option value="be">Belarusian</option>
                  <option value="bn">Bengali</option>
                  <option value="bs">Bosnian</option>
                  <option value="bg">Bulgarian</option>
                  <option value="my">Burmese</option>
                  <option value="ca">Catalan</option>
                  <option value="ceb">Cebuano</option>
                  <option value="km">Central Khmer</option>
                  <option value="zh">Chinese</option>
                  <option value="co">Corsican</option>
                  <option value="hr">Croatian</option>
                  <option value="cs">Czech</option>
                  <option value="da">Danish</option>
                  <option value="nl">Dutch</option>
                  <option value="en">English</option>
                  <option value="eo">Esperanto</option>
                  <option value="et">Estonian</option>
                  <option value="fi">Finnish</option>
                  <option value="fr">French</option>
                  <option value="gl">Galician</option>
                  <option value="ka">Georgian</option>
                  <option value="de">German</option>
                  <option value="gu">Gujarati</option>
                  <option value="ht">Haitian</option>
                  <option value="ha">Hausa</option>
                  <option value="haw">Hawaiian</option>
                  <option value="he">Hebrew</option>
                  <option value="hi">Hindi</option>
                  <option value="hmn">Hmong</option>
                  <option value="hu">Hungarian</option>
                  <option value="is">Icelandic</option>
                  <option value="ig">Igbo</option>
                  <option value="id">Indonesian</option>
                  <option value="ga">Irish</option>
                  <option value="it">Italian</option>
                  <option value="ja">Japanese</option>
                  <option value="jv">Javanese</option>
                  <option value="kn">Kannada</option>
                  <option value="kk">Kazakh</option>
                  <option value="rw">Kinyarwanda</option>
                  <option value="ky">Kirghiz</option>
                  <option value="ko">Korean</option>
                  <option value="ku">Kurdish</option>
                  <option value="lo">Lao</option>
                  <option value="la">Latin</option>
                  <option value="lv">Latvian</option>
                  <option value="lt">Lithuanian</option>
                  <option value="lb">Luxembourgish</option>
                  <option value="mk">Macedonian</option>
                  <option value="mg">Malagasy</option>
                  <option value="ms">Malay (macrolanguage)</option>
                  <option value="ml">Malayalam</option>
                  <option value="mt">Maltese</option>
                  <option value="mi">Maori</option>
                  <option value="mr">Marathi</option>
                  <option value="el">Modern Greek (1453-)</option>
                  <option value="mn">Mongolian</option>
                  <option value="ne">Nepali (macrolanguage)</option>
                  <option value="no">Norwegian</option>
                  <option value="ny">Nyanja</option>
                  <option value="or">Oriya (macrolanguage)</option>
                  <option value="pa">Panjabi</option>
                  <option value="fa">Persian</option>
                  <option value="pl">Polish</option>
                  <option value="pt">Portuguese</option>
                  <option value="ps">Pushto</option>
                  <option value="ro">Romanian</option>
                  <option value="ru">Russian</option>
                  <option value="sm">Samoan</option>
                  <option value="gd">Scottish Gaelic</option>
                  <option value="sr">Serbian</option>
                  <option value="sn">Shona</option>
                  <option value="sd">Sindhi</option>
                  <option value="si">Sinhala</option>
                  <option value="sk">Slovak</option>
                  <option value="sl">Slovenian</option>
                  <option value="so">Somali</option>
                  <option value="st">Southern Sotho</option>
                  <option value="es">Spanish</option>
                  <option value="su">Sundanese</option>
                  <option value="sw">Swahili (macrolanguage)</option>
                  <option value="sv">Swedish</option>
                  <option value="tl">Tagalog</option>
                  <option value="tg">Tajik</option>
                  <option value="ta">Tamil</option>
                  <option value="tt">Tatar</option>
                  <option value="te">Telugu</option>
                  <option value="th">Thai</option>
                  <option value="tr">Turkish</option>
                  <option value="tk">Turkmen</option>
                  <option value="ug">Uighur</option>
                  <option value="uk">Ukrainian</option>
                  <option value="ur">Urdu</option>
                  <option value="uz">Uzbek</option>
                  <option value="vi">Vietnamese</option>
                  <option value="cy">Welsh</option>
                  <option value="fy">Western Frisian</option>
                  <option value="xh">Xhosa</option>
                  <option value="yi">Yiddish</option>
                  <option value="yo">Yoruba</option>
                  <option value="zu">Zulu</option>
                </select>

                <label
                  for="language"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Language that you want to Translate
                </label>
                <select
                  id="language"
                  value={targetLanguage}
                  onChange={handleSecondDropdownChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
  <option value="">Select Language</option>

                  <option value="af">Afrikaans</option>
                  <option value="sq">Albanian</option>
                  <option value="am">Amharic</option>
                  <option value="ar">Arabic</option>
                  <option value="hy">Armenian</option>
                  <option value="az">Azerbaijani</option>
                  <option value="eu">Basque</option>
                  <option value="be">Belarusian</option>
                  <option value="bn">Bengali</option>
                  <option value="bs">Bosnian</option>
                  <option value="bg">Bulgarian</option>
                  <option value="my">Burmese</option>
                  <option value="ca">Catalan</option>
                  <option value="ceb">Cebuano</option>
                  <option value="km">Central Khmer</option>
                  <option value="zh">Chinese</option>
                  <option value="co">Corsican</option>
                  <option value="hr">Croatian</option>
                  <option value="cs">Czech</option>
                  <option value="da">Danish</option>
                  <option value="nl">Dutch</option>
                  <option value="en">English</option>
                  <option value="eo">Esperanto</option>
                  <option value="et">Estonian</option>
                  <option value="fi">Finnish</option>
                  <option value="fr">French</option>
                  <option value="gl">Galician</option>
                  <option value="ka">Georgian</option>
                  <option value="de">German</option>
                  <option value="gu">Gujarati</option>
                  <option value="ht">Haitian</option>
                  <option value="ha">Hausa</option>
                  <option value="haw">Hawaiian</option>
                  <option value="he">Hebrew</option>
                  <option value="hi">Hindi</option>
                  <option value="hmn">Hmong</option>
                  <option value="hu">Hungarian</option>
                  <option value="is">Icelandic</option>
                  <option value="ig">Igbo</option>
                  <option value="id">Indonesian</option>
                  <option value="ga">Irish</option>
                  <option value="it">Italian</option>
                  <option value="ja">Japanese</option>
                  <option value="jv">Javanese</option>
                  <option value="kn">Kannada</option>
                  <option value="kk">Kazakh</option>
                  <option value="rw">Kinyarwanda</option>
                  <option value="ky">Kirghiz</option>
                  <option value="ko">Korean</option>
                  <option value="ku">Kurdish</option>
                  <option value="lo">Lao</option>
                  <option value="la">Latin</option>
                  <option value="lv">Latvian</option>
                  <option value="lt">Lithuanian</option>
                  <option value="lb">Luxembourgish</option>
                  <option value="mk">Macedonian</option>
                  <option value="mg">Malagasy</option>
                  <option value="ms">Malay (macrolanguage)</option>
                  <option value="ml">Malayalam</option>
                  <option value="mt">Maltese</option>
                  <option value="mi">Maori</option>
                  <option value="mr">Marathi</option>
                  <option value="el">Modern Greek (1453-)</option>
                  <option value="mn">Mongolian</option>
                  <option value="ne">Nepali (macrolanguage)</option>
                  <option value="no">Norwegian</option>
                  <option value="ny">Nyanja</option>
                  <option value="or">Oriya (macrolanguage)</option>
                  <option value="pa">Panjabi</option>
                  <option value="fa">Persian</option>
                  <option value="pl">Polish</option>
                  <option value="pt">Portuguese</option>
                  <option value="ps">Pushto</option>
                  <option value="ro">Romanian</option>
                  <option value="ru">Russian</option>
                  <option value="sm">Samoan</option>
                  <option value="gd">Scottish Gaelic</option>
                  <option value="sr">Serbian</option>
                  <option value="sn">Shona</option>
                  <option value="sd">Sindhi</option>
                  <option value="si">Sinhala</option>
                  <option value="sk">Slovak</option>
                  <option value="sl">Slovenian</option>
                  <option value="so">Somali</option>
                  <option value="st">Southern Sotho</option>
                  <option value="es">Spanish</option>
                  <option value="su">Sundanese</option>
                  <option value="sw">Swahili (macrolanguage)</option>
                  <option value="sv">Swedish</option>
                  <option value="tl">Tagalog</option>
                  <option value="tg">Tajik</option>
                  <option value="ta">Tamil</option>
                  <option value="tt">Tatar</option>
                  <option value="te">Telugu</option>
                  <option value="th">Thai</option>
                  <option value="tr">Turkish</option>
                  <option value="tk">Turkmen</option>
                  <option value="ug">Uighur</option>
                  <option value="uk">Ukrainian</option>
                  <option value="ur">Urdu</option>
                  <option value="uz">Uzbek</option>
                  <option value="vi">Vietnamese</option>
                  <option value="cy">Welsh</option>
                  <option value="fy">Western Frisian</option>
                  <option value="xh">Xhosa</option>
                  <option value="yi">Yiddish</option>
                  <option value="yo">Yoruba</option>
                  <option value="zu">Zulu</option>
                </select>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-300 hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Translate PDF
                </button>

                {download && (
                  <>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="w-full text-white bg-blue-300 hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-400 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Download Translated PDF
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PdfTranslator;
