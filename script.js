let model;
let userAnswer = null;

async function loadModel() {
  try {
    model = await tf.loadGraphModel("modeltfjs/model.json");
    console.log("Model loaded successfully");
  } catch (error) {
    console.error("Error loading the model:", error);
  }
}

function preprocessImage(imageElement) {
  let imageTensor = tf.browser
    .fromPixels(imageElement)
    .resizeBilinear([224, 224])
    .toFloat()
    .div(tf.scalar(255))
    .expandDims();

  return imageTensor;
}

async function classifyImage(imageElement) {
  try {
    const imageTensor = preprocessImage(imageElement);
    const predictions = await model.predict(imageTensor).array();
    const classNames = [
      "Baterai",
      "Kaca",
      "Kertas",
      "Logam",
      "Organik",
      "Plastik",
    ];

    predictions[0].forEach((probability, index) => {
      console.log(`${classNames[index]}: ${(probability * 100).toFixed(2)}%`);
    });

    const maxIndex = predictions[0].indexOf(Math.max(...predictions[0]));
    const classifiedLabel = classNames[maxIndex];
    const resultText = `${classifiedLabel}`;
    if (userAnswer === classifiedLabel) {
      document.getElementById("feedback").innerText = `Jawaban Kamu Benar`;
      document.getElementById("feedback").style.backgroundColor = "#32cd32";
    } else {
      document.getElementById("feedback").innerText = `Jawaban Kamu Salah`;
      document.getElementById("feedback").style.backgroundColor = "red";
    }
    document.getElementById("result1").innerText = `${resultText}`;
    if (classifiedLabel === classNames[0]) {
      document.getElementById(
        "result2"
      ).innerText = `Baterai adalah sumber energi listrik yang umum digunakan pada berbagai perangkat elektronik. Namun, baterai termasuk dalam kategori sampah berbahaya dan beracun (B3) karena mengandung zat kimia berbahaya seperti merkuri, kadmium, dan asam sulfat. Jika tidak dibuang dengan benar, zat-zat ini dapat mencemari tanah dan air, serta membahayakan kesehatan manusia dan lingkungan.`;
    } else if (classifiedLabel === classNames[1]) {
      document.getElementById(
        "result2"
      ).innerText = `Kaca adalah bahan padat non-kristalin yang keras dan transparan. Sampah kaca umumnya berasal dari botol, gelas, cermin, dan lampu. Kaca merupakan bahan yang dapat didaur ulang berkali-kali tanpa mengurangi kualitasnya. Namun, proses daur ulang kaca membutuhkan energi yang cukup besar.`;
    } else if (classifiedLabel === classNames[2]) {
      document.getElementById(
        "result2"
      ).innerText = `Kertas terbuat dari serat tumbuhan, terutama kayu. Sampah kertas meliputi buku, koran, majalah, karton, dan kemasan kertas. Kertas adalah salah satu jenis sampah yang paling mudah didaur ulang. Daur ulang kertas dapat mengurangi penebangan pohon dan menghemat energi.`;
    } else if (classifiedLabel === classNames[3]) {
      document.getElementById(
        "result2"
      ).innerText = `Logam adalah unsur kimia yang umumnya bersifat padat, kuat, dan memiliki konduktivitas listrik dan panas yang baik. Sampah logam meliputi kaleng, aluminium foil, besi tua, dan peralatan rumah tangga berbahan logam. Logam merupakan bahan yang dapat didaur ulang sepenuhnya dan memiliki nilai ekonomis yang tinggi.`;
    } else if (classifiedLabel === classNames[4]) {
      document.getElementById(
        "result2"
      ).innerText = `Sampah organik adalah sampah yang berasal dari makhluk hidup, baik hewan maupun tumbuhan. Contoh sampah organik adalah sisa makanan, daun-daun kering, ranting, dan kotoran hewan. Sampah organik mudah terurai secara alami oleh mikroorganisme dalam tanah dan dapat dijadikan kompos untuk menyuburkan tanah.`;
    } else if (classifiedLabel === classNames[5]) {
      document.getElementById(
        "result2"
      ).innerText = `Plastik adalah polimer sintetis yang dibuat dari minyak bumi. Sampah plastik sangat sulit terurai secara alami dan dapat mencemari lingkungan selama ratusan tahun. Contoh sampah plastik adalah kantong plastik, botol plastik, kemasan plastik, dan styrofoam. Meskipun beberapa jenis plastik dapat didaur ulang, namun proses daur ulang plastik juga memiliki keterbatasan.`;
    }
  } catch (error) {
    console.error("Error classifying image:", error);
  }
}

document.getElementById("imageUpload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const image = new Image();
    image.src = e.target.result;
    document.getElementById("uploadedImage").src = e.target.result;
    document.getElementById("uploadedImage").classList.add("filled");
    document.getElementById("file-name").style.display = "none";
    document.getElementById("deleteImage").style.display = "block";
    document.getElementById("takePhotoButton").style.display = "none";
    document.getElementById("choosePhotoButton").style.display = "none";
    document.getElementById("classifyButton").style.display = "inline-block";
  };

  reader.readAsDataURL(file);
});

// Ambil elemen input kamera
document.getElementById("cameraInput").addEventListener("change", (event) => {
  const file = event.target.files[0]; // Dapatkan file dari input
  const reader = new FileReader();

  reader.onload = (e) => {
    // Buat gambar baru dari data file yang diunggah
    const image = new Image();
    image.src = e.target.result;

    // Tampilkan gambar di elemen dengan id 'uploadedImage'
    document.getElementById("uploadedImage").src = e.target.result;
    document.getElementById("uploadedImage").classList.add("filled");

    // Sembunyikan elemen-elemen tertentu
    document.getElementById("file-name").style.display = "none";
    document.getElementById("deleteImage").style.display = "block";
    document.getElementById("takePhotoButton").style.display = "none";
    document.getElementById("choosePhotoButton").style.display = "none";
    document.getElementById("classifyButton").style.display = "inline-block";
  };

  reader.readAsDataURL(file); // Membaca file gambar sebagai URL data (base64)
});

document.getElementById("imageUpload2").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const image = new Image();
    image.src = e.target.result;
    document.getElementById("uploadedImage").src = e.target.result;
    document.getElementById("uploadedImage").classList.add("filled");
    document.getElementById("file-name").style.display = "none";
    document.getElementById("deleteImage").style.display = "block";
    document.getElementById("takePhotoButton").style.display = "none";
    document.getElementById("choosePhotoButton").style.display = "none";
    document.getElementById("classifyButton").style.display = "inline-block";
  };

  reader.readAsDataURL(file);
});

document.getElementById("deleteImage").addEventListener("click", () => {
  document.getElementById("uploadedImage").src = "img/1.png";
  document.getElementById("uploadedImage").classList.remove("filled");
  document.getElementById("file-name").style.display = "block";
  document.getElementById("deleteImage").style.display = "none";
  document.getElementById("takePhotoButton").style.display = "inline-block";
  document.getElementById("choosePhotoButton").style.display = "inline-block";
  document.getElementById("classifyButton").style.display = "none";
  document.getElementById("result1").innerText = "";
  document.getElementById("result2").innerText = "";
  document.getElementById("classification-result").style.display = "none";
  document.getElementById("feedback").style.backgroundColor = "";
  document.getElementById("feedback").innerText = "";
  console.clear();
});

document.getElementById("back-button").addEventListener("click", () => {
  document.getElementById("uploadedImage").src = "img/1.png";
  document.getElementById("uploadedImage").classList.remove("filled");
  document.getElementById("file-name").style.display = "block";
  document.getElementById("deleteImage").style.display = "none";
  document.getElementById("takePhotoButton").style.display = "inline-block";
  document.getElementById("choosePhotoButton").style.display = "inline-block";
  document.getElementById("classifyButton").style.display = "none";
  document.getElementById("result1").innerText = "";
  document.getElementById("result2").innerText = "";
  document.getElementById("classification-result").style.display = "none";
  document.getElementById("feedback").style.backgroundColor = "";
  document.getElementById("feedback").innerText = "";
  console.clear();
});

document.getElementById("classifyButton").addEventListener("click", () => {
  const imageElement = document.getElementById("uploadedImage");
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popupImage");
  popupImage.src = imageElement.src;
  popup.style.display = "flex";
});

document.querySelectorAll(".popup-option").forEach((button) => {
  button.addEventListener("click", (event) => {
    userAnswer = event.target.getAttribute("data-answer");
    document.getElementById("popup").style.display = "none";
    document.getElementById("classifyButton").style.display = "none";

    const imageElement = document.getElementById("uploadedImage");
    classifyImage(imageElement);
    document.getElementById("classification-result").style.display =
      "inline-block";
  });
});

window.onload = loadModel;
