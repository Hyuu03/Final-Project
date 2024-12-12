// Variabel global untuk menyimpan model
let model;

// Fungsi untuk memuat model dari file model.json
async function loadModel() {
  console.log('Memuat model...');
  model = await tf.loadGraphModel('model/model.json');
  console.log('Model berhasil dimuat.');
}

// Fungsi untuk menampilkan pratinjau gambar yang diunggah
function previewImage(event) {
  const imagePreview = document.getElementById('image-preview');
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

// Fungsi untuk memproses gambar dan melakukan prediksi
async function predictImage() {
  const imageElement = document.getElementById('image-preview');

  // Pastikan gambar telah dimuat
  if (!imageElement.src) {
    alert('Harap unggah gambar terlebih dahulu.');
    return;
  }

  // Pra-pemrosesan gambar: ubah ukuran menjadi 224x224 (sesuai input model)
  const imageTensor = tf.browser.fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224])  // ukuran input sesuai model (224, 224)
    .toFloat()
    .div(tf.scalar(255.0))  // normalisasi nilai piksel (0-255) ke (0-1)
    .expandDims(0);  // tambahkan dimensi batch

  // Lakukan prediksi
  const predictions = await model.predict(imageTensor).data();
  console.log('Prediksi:', predictions);

  // Tentukan label dengan probabilitas tertinggi
  const maxIndex = predictions.indexOf(Math.max(...predictions));
  const resultElement = document.getElementById('prediction-result');
  resultElement.textContent = `Prediksi: Kelas ${maxIndex} dengan probabilitas ${(predictions[maxIndex] * 100).toFixed(2)}%`;
}

// Muat model saat halaman dimuat
window.onload = async () => {
  await loadModel();
  document.getElementById('image-preview').addEventListener('load', predictImage);
};
