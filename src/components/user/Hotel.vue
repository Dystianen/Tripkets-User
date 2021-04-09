<template>
            <section id="kereta-cari">
      <div class="form-kereta container border-primary shadow p-3 mt-5">
        <form class="row me-0">
          <div class="col-md-6 pe-0">
            <label for="keretaBerangkat" class="form-label">Keberangkatan</label>
            <input class="form-control" list="keretaStasiun" id="keretaBerangkat" placeholder="Stasiun Keberangkatan" />
            <datalist id="keretaStasiun">
              <option value="Jakarta"></option>
              <option value="Bandung"></option>
              <option value="Ngawi"></option>
              <option value="Wakanda"></option>
              <option value="New Zealand"></option>
            </datalist>
          </div>
          <div class="col-md-6">
            <label for="keretaTujuan" class="form-label">Tujuan</label>
            <input class="form-control" list="keretaStasiun" id="keretaTujuan" placeholder="Stasiun Tujuan" />
            <datalist id="keretaStasiun">
              <option value="Jakarta"></option>
              <option value="Bandung"></option>
              <option value="Ngawi"></option>
              <option value="Wakanda"></option>
              <option value="New Zealand"></option>
            </datalist>
          </div>
          <div class="row me-0">
            <div class="col-md-6 pe-0">
              <label for="keretaTanggal" class="form-label">Tanggal</label>
              <input class="form-control" type="date" name="keretaTanggal" id="keretaTanggal" />
            </div>
            <div class="col-md-2 ps-4">
              <label for="jumlahPenumpang" class="form-label">Jumlah</label>
              <input class="form-control" type="number" name="jumlahPenumpang" id="jumlahPenumpang" placeholder="1" />
            </div>
          </div>

          <div class="col-12 mt-3">
            <button type="submit" class="btn btn-primary rounded">Cari ...</button>
          </div>
        </form>
      </div>
    </section>
</template>

<script>
export default {
  data : function(){
    return{
      search: "",
      id: "",
      id_category: "",
      
    }
  },
  searching : function(){
  let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
  let offset = (this.currentPage - 1) * this.perPage;
  this.$bvToast.show("loadingToast");
  let form = new FormData();
  form.append("find", this.search);
  axios.post(base_url + "/user/" + this.perPage + "/" + offset, form, conf)
  .then(response => {
    if(response.data.status == 1){
      this.$bvToast.hide("loadingToast");
      this.user = response.data.user;
      this.rows = response.data.count;
    } else {
      window.location = "../login.html";
    }
  })
  .catch(error => {
      console.log(error);
  });
},   
}
</script>