function initCTA() {
  const btnBasic = document.getElementById('btn-basic');
  const btnDeep = document.getElementById('btn-deep');
  const ctaForm = document.getElementById('cta-form');
  const ctaButtons = document.getElementById('cta-buttons');
  const cancelBtn = document.getElementById('cta-cancel');
  const submitBtn = document.getElementById('cta-submit');
  const badgeBasic = document.getElementById('badge-basic');
  const badgeDeep = document.getElementById('badge-deep');

  let selectedService = 'basic';

  function openForm(service) {
    selectedService = service;
    badgeBasic.classList.toggle('active', service === 'basic');
    badgeDeep.classList.toggle('active', service === 'deep');
    ctaButtons.style.opacity = '0';
    ctaButtons.style.transform = 'translateY(-10px)';
    ctaButtons.style.pointerEvents = 'none';
    setTimeout(() => {
      ctaButtons.style.display = 'none';
      ctaForm.classList.add('open');
    }, 300);
  }

  function closeForm() {
    ctaForm.classList.remove('open');
    setTimeout(() => {
      ctaButtons.style.display = 'flex';
      ctaButtons.style.opacity = '1';
      ctaButtons.style.transform = 'translateY(0)';
      ctaButtons.style.pointerEvents = 'all';
    }, 400);
  }

  btnBasic.addEventListener('click', () => openForm('basic'));
  btnDeep.addEventListener('click', () => openForm('deep'));
  cancelBtn.addEventListener('click', closeForm);

  badgeBasic.addEventListener('click', () => {
    selectedService = 'basic';
    badgeBasic.classList.add('active');
    badgeDeep.classList.remove('active');
  });

  badgeDeep.addEventListener('click', () => {
    selectedService = 'deep';
    badgeDeep.classList.add('active');
    badgeBasic.classList.remove('active');
  });

  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('cta-name').value.trim();
    const phone = document.getElementById('cta-phone').value.trim();
    const shoe = document.getElementById('cta-shoe').value.trim();
    const note = document.getElementById('cta-note').value.trim();

    if (!name || !phone || !shoe) {
      alert('Mohon lengkapi nama, nomor WhatsApp, dan jenis sepatu.');
      return;
    }

    const service = selectedService === 'deep' ? 'Deep Clean (Rp 75.000+)' : 'Basic Clean (Rp 35.000+)';
    const msg = `Halo Shushine! 👟\n\nSaya ingin memesan layanan:\n\n*Layanan:* ${service}\n*Nama:* ${name}\n*No. WA:* ${phone}\n*Jenis Sepatu:* ${shoe}\n*Catatan:* ${note || '-'}\n\nMohon info lebih lanjut. Terima kasih!`;

    const waNumber = '6281234567890';
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    closeForm();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCTA);
} else {
  initCTA();
}
