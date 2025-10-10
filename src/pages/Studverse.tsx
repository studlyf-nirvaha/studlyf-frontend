import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Extract YouTube video ID from URL
function getYouTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

// Get YouTube thumbnail URL
function getYouTubeThumbnail(id) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

// Replace the below arrays with your full lists!
const categories = [
  {
    name: 'Business & Money',
    videos: [
      // Podcasts section + Business Studies section
      'https://youtu.be/gLeMTK3PeC8?si=WD5KEwhQeN-RhI7D',
      'https://youtu.be/RsAKKF2-_Kg?si=eX9O8Dr5W_DgqVo4',
      'https://youtu.be/RINKUFWzwfk?si=ELuEA0UWBeYz3Lop',
      'https://youtu.be/JABjvOCl4Mg?si=m4Hzud4OXUDS4Bxh',
      'https://youtu.be/P98ib95eCng?si=y1jcCDk_fSBTpmzi',
      'https://youtu.be/0-FUhQKe-eU?si=fUMGWTxOBie7zDa_',
      'https://youtu.be/RDS4Crfk_wQ?si=dZ5Jxx3qgDzcwSum',
      'https://youtu.be/0_Yv7zDawl8?si=2t8uwEUQm0i9EFxe',
      'https://youtu.be/zZ-VeqYPxoA?si=39H_JqZ7n5K9MlYY',
      'https://youtu.be/7ARBJQn6QkM?si=gzk_Jfw9I0zWfPPP',
      'https://youtu.be/3V9DawfbaQk?si=oCACLhNt0xZScAVz',
      'https://youtu.be/TdQ2UD-U9rQ?si=vgPXzKKLjgV0jdo9',
      'https://youtu.be/yVTNge3sXpg?si=TyMuYXIXKPJOc4a2',
      'https://youtu.be/ZmvIZqweUg0?si=8iDkp7M3PysWbSYC',
      'https://youtu.be/FPV5fAkqyBs?si=91HmZ94yzqif4Qe7',
      'https://youtu.be/SfOaZIGJ_gs?si=5FjotGS8JMF8t3rl',
      'https://youtu.be/QT2FGbR0nIM?si=9-qX5SmkfMCmBvVF',
      'https://youtu.be/nGpir4oUfJI?si=IpLOEVM1Q7xYnfif',
      'https://youtu.be/oX7OduG1YmI?si=pUy1dLvUTsx12GGH',
      'https://youtu.be/2caQ4j9oohE?si=T0e36i9W-d2YSu95',
      'https://youtu.be/4eIDBV4Mpek?si=ko5yO5ua1A5xSAkP',
      'https://youtu.be/nxhblFFBXYE?si=5F6tKl6ZqA8YC3ys',
      'https://youtu.be/rFZrL1RiuVI?si=Fgd0YfByqwbh50GK',
      'https://youtu.be/WKHKy89QaV0?si=Ur3YzeTkWZQU_C2d',
      'https://youtu.be/dl7mQ0xWSfw?si=tuPtYxFyMFafom1i',
      'https://youtu.be/XaG2QNfiPnk?si=3G-Rf_AtM5A4Zbnw',
      'https://youtu.be/Gj5isSWEPB8?si=3uNhE2HcpAOvsj-w',
      'https://youtu.be/0zDrtWVQSMI?si=9NYc3Z-rdGnKk3Dx',
      'https://youtu.be/UCFA18DAlnM?si=9CRZ1OpEOEBMc_Mf',
      'https://youtu.be/gLeMTK3PeC8?si=fXA1OujvHpDMn51b',
      'https://youtu.be/JbNS8n4QX3A?si=rAoVL4oduEavS8gM',
      'https://youtu.be/1sOgYNgq88E?si=U_xe-6ude_cpechr',
      'https://youtu.be/hzUuklUo5NA?si=6BKBG-UckFL3T6JJ',
      'https://youtu.be/cU7_KNgPO1w?si=-0ac9qMKZnNJAoy3',
      'https://youtu.be/DU0IMLDnrm4?si=7QV9aezzFqh1Yww_',
      'https://youtu.be/weIpfVpamDg?si=z43ZuaLHG_tZM22l',
      'https://youtu.be/s8NWNIGObjU?si=9FC8L8K_6Q5qRZbT',
      'https://youtu.be/W4iHnvaNj_8?si=X8Mi_UcleJ2IBZ87',
      'https://youtu.be/XiXLti_Y_is?si=RaWgE_JBiLVyDEpS',
      'https://youtu.be/4omR8rMKI6Y?si=UdF3MdtNIev7PA-6',
      'https://youtu.be/bxBzsSsqQAM?si=SK-CCdUYyLpzdOCe',
      'https://youtu.be/9c3oNP8yiKs?si=4ETIltRpHs_LwArS',
      'https://youtu.be/rOLyWlDpb8Q?si=beOeBHNIrAsh-wd4',
      'https://youtu.be/ShYKkPPhOoc?si=I8whdAaFJrHwRxJo',
      'https://youtu.be/5fI3zz2cp3k?si=3fdAIJiIVL8Ai5-z',
      'https://youtu.be/7Kn-KxCQjI8?si=kJW2F9hbLoea8o4h',
      'https://youtu.be/Y0tyE739pK4?si=5Ub_sjCS_iRSSlOY',
      'https://youtu.be/TANaRNMbYgk?si=ixF3KmjIwrlSfq6C',
      'https://youtu.be/1QC9X_QW52k?si=AMgNYUMKpxV8NIa9',
      'https://youtu.be/Xjq0kljBZnY?si=Nmsik8Uq1eg5mtOt',
      'https://youtu.be/UbTQxcrxSeo?si=9QXL3QixxuNMbhRu',
      'https://youtu.be/W-lknT7acYo?si=Z7keCmLAx2gM_NZL',
      'https://youtu.be/xOeGbJ2bYL0?si=AajNFDS_VtLnNIKo',
      'https://youtu.be/n2VFouvCvQo?si=f8wV8lJpDt6xUuXz',
      'https://youtu.be/sO4te2QNsHY?si=0Q2XlB0w_W5c5l8Z',
      'https://youtu.be/8zcnK6Lx_p4?si=2jgyq2qCNVcmzYIm',
      'https://youtu.be/obb4NHraKaE?si=1bvkXcw8JRGs2knD',
      'https://youtu.be/eHJnEHyyN1Y?si=2xiBr9fzDjiVc7NX',
      'https://youtu.be/XXsTGqy4oww?si=04WD6kMWCG437X0p',
      'https://youtu.be/ZkotRuUFeXg?si=-66FKoaa6TdHMZZZ',
      'https://youtu.be/Qa_4c9zrxf0?si=RnFl03Jl7mECPiMS',
      'https://youtu.be/180KJQryGwc?si=xGuxm2sc7KdL1qR0',
      'https://youtu.be/TqjNTqpHxfA?si=vAoc9bP3U2WdJly6',
      'https://youtu.be/u36A-YTxiOw?si=KtFPA1UEYlVWURaW',
      'https://youtu.be/U2-vDG54Btc?si=jF8EStSxKneHiUz4',
      'https://youtu.be/78Zxx3o55PM?si=ZTpGtF662V4_xkhH',
      'https://youtu.be/nPfZwuBnKJY?si=zL68EYEoe0-NU3ji',
      'https://youtu.be/WgtHo16hXyw?si=Y4h6xxXQJThvjltj',
      'https://youtu.be/qc1GjNM3oaM?si=mxYqF7Kfx9Q8HVK5',
      'https://youtu.be/FgzyLoSkL5k?si=-25NJGXt1xsclX5A',
      'https://youtu.be/I_mkNHz-mZw?si=O1h1v8_2NN119T6b',
      'https://youtu.be/Q3EE-V-cMog?si=8sIJw8bGvsq7FX6Z',
      'https://youtu.be/REFExrj1Jgg?si=nSAfga7fhrczQ5cH',
    ],
  },
  {
    name: 'Modern Spirituality',
    videos: [
      'https://youtu.be/HEAZF_aUkRU?si=fzfiO0aCGvsK5-P-',
      'https://youtu.be/M7x6A9hMeUo?si=hFcbTcg9gHewHtaB',
      'https://youtu.be/sH9bBSXRU2M?si=3blph1hfNXQqrL78',
      'https://youtu.be/FRTpI2Gu1KA?si=q-LSBHiRsEuAUWgC',
      'https://youtu.be/LHLaP7g1SaA?si=jeKxZF7vBB4-6IMo',
      'https://youtu.be/jpYHVyDyOlQ?si=Uf2Sk-zgr43SYteq',
      'https://youtu.be/7tOWbpFvcug?si=siHRhI-fFquuMKZl',
      'https://youtu.be/vsax8o_X660?si=xxemWnxM0ADwQynd',
      'https://youtu.be/P9T9DCK-KcY?si=5_eXmboHng8Bn5Tc',
      'https://youtu.be/PCKF9QVm0Fo?si=x5AsCpy1vrOeJgqt',
      'https://youtu.be/G0GaiM7s854?si=5Wamr0YhOl4HacgL',
      'https://youtu.be/GjL3Zia7U5g?si=U3A_GoqGv5hRkcqR',
      'https://youtu.be/uLgfYg7Z-bc?si=uDgBUvO4uGGdHBNM'
    ],
  },
  {
    name: 'Micro Learning',
    videos: [
      // Fill with your Micro Learning video URLs from your source list
      'https://youtu.be/K45s2PgywvI?si=yEQ97k_Ch6QWoXZV',
      'https://youtu.be/tAYq5tAJxB0?si=BiWhLa2vpLxVmgDL',
      'https://youtu.be/PwNJXUdMkVY?si=zsbY2mVx6R2NKLEs',
      'https://youtu.be/gERszKkxZOw?si=oIwkSyFLHJ7Lr1sj',
      'https://youtu.be/s9Qh9fWeOAk?si=eOLb302D-K1vn6Vf',
      'https://youtu.be/_l5Q5kKHtR8?si=7iK3gyTyA2_txjQ4',
      'https://youtu.be/OEGInbQ7EbU?si=gQ8g8z3TUlXupzsz',
      'https://youtu.be/TuNvdQUVkto?si=BtGRQ8j1StUnlFv5',
      'https://youtu.be/0yw-z6f7Mb4?si=av63gbXqWte8u1Jz',
      'https://youtu.be/gLptmcuCx6Q?si=b4ydmSUloBirkMsF',
      'https://youtu.be/tgDAFumt65o?si=5RMMLmvJNguh74jR',
      'https://youtu.be/aSQq1ewECgk?si=lVYWEZI0RIw9L5xl',
      'https://youtu.be/pBASqUbZgkY?si=fler9VfrnwO0XCWz',
      'https://youtu.be/oWRI6xKEZMk?si=R6owN2VZghL_zgNa',
      'https://youtu.be/fqySz1Me2pI?si=aeQtHqBceGfPSbpy',
      'https://youtu.be/sAJyhErLAio?si=gMDvNjwKWhI2uUKJ',
      'https://youtu.be/OWp3F9VlUT0?si=pF-w0iXmGXyi_4dO',
      'https://youtu.be/sp3mMwo3PO0?si=IoQR42YieZMsEDW5',
      'https://youtu.be/pBASqUbZgkY?si=rKJyvqzB_Hhy0h3q',
      'https://youtu.be/z5lpHsl8qQ4?si=54u5P86QArhB5l0w',
      'https://youtu.be/bBC-nXj3Ng4?si=q_oBbYx8n5pKko0e',
      'https://youtu.be/kK7L2ISGucM?si=BcNwidKTRhBvW1Tt',
      'https://youtu.be/FsB_nRGdeLs?si=XdlFyGKV7iBTA0By',
      'https://youtu.be/_HQ2H_0Ayy0?si=KP2lyZcRoOCoDcvN',
      'https://youtu.be/e3fz3dqhN44?si=D3FghsbXyrbi8Bq3',
      'https://youtu.be/11Hnld1r84o?si=xpJRxum_5bGDCw4C',
      'https://youtu.be/iiADhChRriM?si=uaUr6h5nq-052C6y',
      'https://youtu.be/z_CU-IeOEzU?si=O3JGHg47JAGGNQcV',
      'https://youtu.be/g2fT-g9PX9o?si=pNQbDp3XFOvHCf1z',
      'https://youtu.be/0buKQHokLK8?si=In7jwuAuB6irPH1v',
      'https://youtu.be/ZaA0kNm18pE?si=SCX8t4YAX68GCvUf',
      'https://youtu.be/lxRAj1Gijic?si=Mx2AZuADLx4q37js',
      'https://youtu.be/tiGw9PQbvrg?si=Oucannhb6gdJFQgb',
      'https://youtu.be/_Pqfjer8-O4?si=e64StjynuQCL0ve9',
      'https://youtu.be/x3c1ih2NJEg?si=wX4KsdioOYXWHQp2',
      'https://youtu.be/gl1r1XV0SLw?si=OYxAJChL7yRnhEQG',
      'https://youtu.be/IkRXpFIRUl4?si=k3yCOmgfKyKq0MH5',
      'https://youtu.be/pPStdjuYzSI?si=N24QzSAC7agLLulZ',
      'https://youtu.be/lPTcTh5sRug?si=kJjuuskxTUm-u21N',
      'https://youtu.be/1wHT-dq7SG0?si=t5_oOCet_IN7gLi2',
      'https://youtu.be/NvZEZ-mZsuI?si=6wkvUvy7c4xy01W_',
      'https://youtu.be/_a6us8kaq0g?si=D6m_O0bnySBbRC9H',
      'https://youtu.be/JOJ5zihcd6Q?si=c0iqZPDFeJzXfkdt',
      'https://youtu.be/Xpk67YzOn5w?si=AXmbFXvmBs0l896S',
      'https://youtu.be/Ob7fjjUieko?si=nAJwAxdi7F8ehPhR',
      'https://youtu.be/CdR50jBG-Nw?si=zNXm2ulcz6y5PBA4',
      'https://youtu.be/BJuwK-JHNw8?si=J9N_5P5oslYUjXaa',
      'https://youtu.be/b7ZC01afWPw?si=jBEfU22LXXCEoteY',
      'https://youtu.be/UjCDWCeHCzY?si=wbpGavwY_5KjaHcE',
      'https://youtu.be/lL_j7ilk7rc?si=r_TugmsaQPkSsw7V',
      'https://youtu.be/T3P3r4cOJN8?si=XBWdEA4ryZJemt1B',
      'https://youtu.be/yubzJw0uiE4?si=Oc_BVXZzsOqFnY66',
      'https://youtu.be/AN7c5S9k5L0?si=Bzcbl9R1P-muPY4D',
      'https://youtu.be/T2imgwapNvI?si=YMx0Lj2CnrrdV9Qx',
    ],
  },
  {
    name: 'Vibe with AI',
    videos: [
      // Fill with provided 'Vibe with AI' video URLs from your list
      'https://youtu.be/7NT70uyKJ7k?si=sDwW8Amum_ouXJrb',
      'https://youtu.be/jiZ9DBiPpUA?si=Y9RronHVCvhNPSgp',
      'https://youtu.be/huariiK4_us?si=Mr9LV7AO7YLa7hq_',
      'https://youtu.be/_998DCW7HbM?si=VQz1b5gKWpGrcy_b',
      'https://youtu.be/TZe5UqlUg0c?si=i67zZHsSuLr3tvgt',
      'https://youtu.be/ViWe60tO5CM?si=aW6-ztN8PQVYFWkS',
      'https://youtu.be/OKwDzKY_WN8?si=gzt3KOQZhEQHPx5f',
      'https://youtu.be/IcCAEudzEDw?si=511iuHuuf2cncijF',
      'https://youtu.be/VSFuqMh4hus?si=Vf8B9rmGH4PQh-ix',
      'https://youtu.be/6gTPmlmu2ew?si=4lenKjUp4r61oPlV',
      'https://youtu.be/peMGr-9-OWY?si=zz1mQcN6tzOyNLrt',
      'https://youtu.be/JinTKY1TJZY?si=0bFePjewsKoX5f6t',
      'https://youtu.be/XeIx4S6YvGo?si=KcHadzrRJs3RfTzO',
      'https://youtu.be/CmHBTV8MK8w?si=e7Is8dux_hKciVar',
      'https://youtu.be/5JgsZCtIH_Q?si=uGn3WrmPVOqLE6q4',
      'https://youtu.be/OpUGl4gBHAU?si=iVHwwWKUa4kTiJzw',
      'https://youtu.be/EUimk1PCsJQ?si=lGz7J_K3x9g50Bw7',
      'https://youtu.be/JFULItoepCs?si=v0RfyWQ6v8QSRiUk',
      'https://youtu.be/O_8myWLqwww?si=IGYDxGY4hPYuIUKW',
      'https://youtu.be/SGRX7crXpV8?si=Qd5BTvCLSsGtRtoV',
      'https://youtu.be/pIo4mbGGyhE?si=-TI3kDRhprUSAHrp',
      'https://youtu.be/Rx9V3Ltiklw?si=m_Lv2XbgGrsnrEsA',
      'https://youtu.be/5i2Hn8OG94o?si=uRMU7ZVp-3fjEiCx',
      'https://youtu.be/yOILgTpXftc?si=ze9u2u2zruQF2LnG',
      'https://youtu.be/PtETUYa3i2Q?si=Nw1e29gO0e68npAH',
      'https://youtu.be/UoY3tB0rMI4?si=Vo0h6sez5aVK7OpU',
      'https://youtu.be/k4ox3iHLH-Q?si=2Cp4245_uBv8R6IK',
      'https://youtu.be/8AWEPx5cHWQ?si=-PLxXk68Thm-3Jb3',
      'https://youtu.be/FwOTs4UxQS4?si=uqUylX9l1wWy3eQn',
    ],
  },
];

const Studverse = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 pt-20 pb-24 relative">
        {/* Main header with extra top padding for visibility */}
        <h1 className="text-5xl sm:text-7xl font-extrabold text-center mb-6 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent drop-shadow-lg uppercase">
          STUDVERSE
        </h1>
        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto px-2">
          {categories.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => setSelected(idx)}
              className={`px-5 py-2 rounded-full font-semibold transition-colors ${
                selected === idx
                  ? "bg-brand-purple text-white"
                  : "bg-white/10 text-white/70 hover:bg-brand-pink"
              }`}
            >
              {cat.name}
            </button>
          ))}
          <button className="px-5 py-2 rounded-full font-semibold bg-white/10 text-white/70 hover:bg-brand-pink">
            + Show more
          </button>
        </div>
        {/* Selected category name */}
        <div className="w-full text-center mb-6">
          <span className="text-2xl font-bold text-brand-purple">
            {categories[selected].name}
          </span>
        </div>
        {/* Grid: 4 per row on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mb-12">
          {categories[selected].videos.map((url, i) => {
            const vid = getYouTubeId(url);
            return vid ? (
              <a
                key={vid}
                href={`https://youtube.com/watch?v=${vid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 rounded-lg hover:shadow-lg flex flex-col"
              >
                <img
                  src={getYouTubeThumbnail(vid)}
                  alt={`YouTube video ${i + 1}`}
                  className="rounded-t-lg object-cover aspect-video"
                />
                <div className="p-3">
                  <h3 className="text-white font-semibold text-base group-hover:text-brand-purple truncate">
                    {`Video ${i + 1}`}
                  </h3>
                  <p className="text-xs text-white/60 truncate">{url}</p>
                </div>
              </a>
            ) : null;
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Studverse;
