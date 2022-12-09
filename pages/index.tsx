import BannerCarousel from "@containers/home/BannerCarousel";
import CollectionContainer from "@containers/home/CollectionContainer";
import Feature from "@containers/home/Feature";
import HomeContainer from "@containers/home/HomeContainer";
import Pricing from "@containers/home/Pricing";
import SmallBannerCarousel from "@containers/home/SmallBannerCarousel";
import Layout from "@layouts/Layout";
import SeoHead from "@seo/SeoHead";
import {
  BannerFromApi,
  BannerType,
  BrandFromApi,
  CollectionFromApi,
  Operator,
  PaginationResult,
} from "@types";
import bannerApi from "api-client/services/bannerApi";
import { GetServerSidePropsResult } from "next";
import { reduce } from "lodash";
import { FC, useMemo } from "react";
import brandApi from "api-client/services/brandApi";
import BrandContainer from "@containers/home/BrandContainer";
import collectionApi from "api-client/services/collectionApi";
import SpecialCollectionContainer from "@containers/home/SpecialCollectionContainer";

type HomeProps = {
  bannersByType: { [key in BannerType]: BannerFromApi[] };
  // collections: CollectionFromApi[];
  // brands: PaginationResult<BrandFromApi>;
};
const brands = {
  results: [
    {
      id: "5d388f8c-a8ef-4626-8e00-c3e620ca0b2a",
      name: "TP-Link",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/tp_link.png",
      description: "TP-Link",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/TPLINK-1620910239558284608-full.jpg",
      order: 0,
      isActive: true,
      slug: "tp-link",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "505baf06-8c55-46ad-9acb-15bddd783437",
      name: "Samsung",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/samsung.png",
      description: "Samsung",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/samsung-1618148687671659429-full.jpg",
      order: 1,
      isActive: true,
      slug: "samsung",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "8898edd3-97f1-4d5a-afc2-0b41ad846359",
      name: "Seagate",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/seagate.png",
      description: "Seagate",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/seagate-1618148804187499993-full.jpg",
      order: 2,
      isActive: true,
      slug: "seagate",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "861a6196-e696-4511-bf8f-2fe65c10ec7c",
      name: "Asus",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/asus.png",
      description:
        "AsusTek Computer Inc нь Тайванийн Тайпэй хотын Бэйтоу дүүрэгт байрладаг Тайваньд төвтэй үндэстэн дамнасан \n\t\t компьютер, утасны техник хэрэгсэл, электроникийн компани юм. Үүнд: ширээний компьютер, зөөврийн компьютер, \n\t\t нетбук, гар утас, сүлжээний төхөөрөмж, монитор, WIFI чиглүүлэгч, проектор, эх хавтан, график карт, оптик \n\t\t хадгалалт, мультимедиа бүтээгдэхүүн, захын хэрэгсэл, элэгддэг хэрэгсэл, сервер, ажлын компьютер, таблет \n\t\t компьютер орно. Тус компани нь мөн анхны тоног төхөөрөмж үйлдвэрлэгч (OEM) юм.",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/asus-1618148608380383887-full.jpg",
      order: 3,
      isActive: true,
      slug: "asus",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "b1ea633b-8440-4b1e-ae41-abb023cdcccc",
      name: "SteelSeries",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/steelseries.png",
      description:
        "SteelSeries компанийг 2001 онд Жейкоб Вулф-Петерсен үүсгэн байгуулсан. Компанийн анхны нэр нь Soft Trading \n\t\t байсан бөгөөд 2007 онд SteelSeries болгон өөрчлөгдсөн байна. Зөөлөн худалдаа нь Icemat болон SteelPad хулганы \n\t\t дэвсгэр хийсэн бөгөөд сүүлийнх нь компанийн эцсийн нэр өөрчлөгдөхөд нөлөөлсөн. 2008 онд SteelSeries компани нь \n\t\t Хойд Америкт суурилсан тоглоомын захын хөгжүүлэгч, үйлдвэрлэгч Ideazon компанийг олж авав.",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/steelseries-1618148697207204776-full.jpg",
      order: 4,
      isActive: true,
      slug: "steelseries",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "6ec0d9d9-acbb-47a3-a554-b2d343c1f5e5",
      name: "ZHIYUN",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Zhiyun-1621508984382211174-full.png",
      description: "ZHIYUN",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Zhiyun-1621508985234371812-full.jpg",
      order: 5,
      isActive: true,
      slug: "zhiyun",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "467bf9c9-0434-46ca-b05b-703061191038",
      name: "AOC",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/aoc.png",
      description:
        "AOC International (AOC-ээр арилжаа хийдэг, өмнө нь Хятад дахь Адмирал Хил Корпораци. Энэхүү компани нь бүхэлдээ IPS, TFT мониторууд, \n\t\t мөн LCD телевизор, урьд нь CROC мониторуудыг дэлхийн өнцөг булан бүрт AOC брэндийн дагуу зарж борлуулдаг, үйлдвэрлэдэг.",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/AOC-1620910051469758364-full.jpg",
      order: 6,
      isActive: true,
      slug: "aoc",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "6b380aa7-1b1f-485a-9868-d4ed1cdcfc6a",
      name: "Thermallright",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Thermalright-1633432227582260980-full.png",
      description: "ddd",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/thermalright-cover-1633432227596659674-full.jpg",
      order: 7,
      isActive: true,
      slug: "thermallright",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "5d23c70f-4609-4ee9-8296-e6f4e692290d",
      name: "JBL",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/jbl-1621246137304072077-full.jpg",
      description: "DS",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/JBL-1621509006131880808-full.jpg",
      order: 8,
      isActive: true,
      slug: "jbl",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "3c2f26d3-2cfb-49f0-9e9e-eb4ba48a850b",
      name: "Acer",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/ACER-1617915570776253157-full.png",
      description: "Acer",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Acer-1620910378424468054-full.jpg",
      order: 9,
      isActive: true,
      slug: "acer",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "52f1b189-d153-477e-b489-9ad6de53fe8c",
      name: "Kingston",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/kingston.png",
      description:
        "Kingston Inc нь Тайваньд төвлөрсөн хувийн компьютер (PC) эд анги, хэрэглээний технологийн бүтээгдэхүүн үйлдвэрлэгч юм. Antec-ийн \n\t\t гол бүтээгдэхүүн бол компьютерийн хэрэг, цахилгаан хангамж юм. Antec нь компьютерийн хөргөлтийн бүтээгдэхүүн, тэмдэглэлийн дэвтэр \n\t\t дагалдах хэрэгсэл, мөн Bluetooth чанга яригч, чихэвч, зөөврийн батерей, цэнэглэх төв зэргийг багтаасан Antec Mobile Products \n\t\t (A.M.P.) цувралуудыг санал болгодог. 1986 онд Калифорнийн Фремонт хотод байгуулагдсан тус компани нь Тайпейд төв байрладаг ба \n\t\t Роттердам, Бээжин, АНУ-д нэмэлт оффисуудтай. Antec бүтээгдэхүүнүүд нь онлайн худалдааны платформ болох Amazon болон борлуулалтын \n\t\t түншүүдээрээ дамжуулан 40 гаруй оронд зарагддаг.",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/kingston-1618148793964609736-full.jpg",
      order: 10,
      isActive: true,
      slug: "kingston",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "190a927b-be74-412d-8db8-69f66c65d80a",
      name: "Logitech",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/logitech.png",
      description: "Logitech",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/logitech-1618148783315127861-full.jpg",
      order: 11,
      isActive: true,
      slug: "logitech",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "143b790d-b952-4b7a-afe6-391094b69988",
      name: "Nvidia",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/nvidia.png",
      description: "Nvidia",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/nvidia-1618148589079153077-full.jpg",
      order: 12,
      isActive: true,
      slug: "nvidia",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
      name: "Intel",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/INTEL-1618148202313044788-full.png",
      description: "Intel",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/intel-1618148360687425251-full.jpg",
      order: 13,
      isActive: true,
      slug: "intel",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "11089ea6-5a67-4054-9c0a-8f26476ec92d",
      name: "Rapoo",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/rapoo_-1621245900740645172-full.jpg",
      description: "hi",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Rapoo-1621508996162459196-full.jpg",
      order: 14,
      isActive: true,
      slug: "rapoo",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "2ef89a18-7b1c-46f2-8175-116fa5146b66",
      name: "Microsoft",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/MICROSOFT-1617915683045401562-full.png",
      description: "Microsoft",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Microsoft-1620910445340657905-full.jpg",
      order: 15,
      isActive: true,
      slug: "microsoft",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "981c7afa-a1ac-4e1b-9e16-e0b33453c56b",
      name: "Lenovo",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/LENOVO-1617915584485332773-full.png",
      description: "Lenovo",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Lenovo-1620910386810000312-full.jpg",
      order: 16,
      isActive: true,
      slug: "lenovo",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "27f859cd-e458-47ca-a28d-35b73bc99f64",
      name: "Adata",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/ADATA-1617915010660369745-full.png",
      description: "Adata",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/ADATA-1620910069134600864-full.jpg",
      order: 17,
      isActive: true,
      slug: "adata",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "3519651f-bc97-44e6-ac04-41494b3c48a4",
      name: "Apple",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/APPLE-1617915597826306938-full.png",
      description:
        "Apple Inc. нь Америкийн үндэстэн дамнасан технологийн компани бөгөөд төв нь Купертино хотод байдаг.\n\t\t Калифорниа, өргөн хэрэглээний цахилгаан хэрэгсэл, компьютерийн програм хангамжийг боловсруулж, борлуулдаг.\n\t\t болон онлайн үйлчилгээ. Энэ нь Big Tech технологийн компаниудын нэг гэж тооцогддог\n\t     Amazon, Google, Microsoft, Facebook.",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Apple-1620910394441995996-full.jpg",
      order: 18,
      isActive: true,
      slug: "apple",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "e4472374-97c0-4ff4-b905-a5de64f4bcb3",
      name: "Cougar",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/COUGAR-1617915181824651824-full.png",
      description: "Cougar",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/COugar-1620910148564350336-full.jpg",
      order: 19,
      isActive: true,
      slug: "cougar",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "16911d0a-42bf-47d1-aa46-847cab558609",
      name: "AMD",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/amd.png",
      description:
        "Advanced Micro Devices, Inc. (AMD) бол Калифорнийн Санта Клара хотод төвлөрсөн хагас дамжуулагч компани \n\t\t бөгөөд бизнес болон хэрэглэгчийн зах зээлд компьютерийн процессорууд болон холбогдох технологиудыг хөгжүүлдэг. \n\t\t Эхэндээ өөрийн процессоруудыг үйлдвэрлэж байсан боловч компани нь 2009 онд GlobalFoundries-ийг гаргасны дараа хиймэл \n\t\t бүтээгдэхүүн гэж нэрлэдэг практик үйлдвэрлэлээ аутсорсинг хийжээ. AMD-ийн гол бүтээгдэхүүнүүд нь микропроцессор, \n\t\t эх хавтангийн чипсет, суулгагдсан процессорууд болон сервер, график процессорууд, хувийн процедуруудад ашигладаг. \n\t\t компьютер, суулгагдсан системийн програмууд.",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/amd-1618148372971984647-full.jpg",
      order: 20,
      isActive: true,
      slug: "amd",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "f5293c6f-1c28-442b-8bd8-17f66db3b6d5",
      name: "Thronmax",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/thronmax-1644235548894085348-full.png",
      description: "Бүх төрлийн микрофон стрийминг хэрэгслүүд",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/thronmax-1644235548893396738-full.jpg",
      order: 21,
      isActive: true,
      slug: "thronmax",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "bdc8b1ab-def9-43ea-aa63-dfdc2ed5c3c4",
      name: "MSI",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/MSI-1617960324053541321-full.png",
      description: "MSI",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/msi-1620909996219350544-full.jpg",
      order: 22,
      isActive: true,
      slug: "msi",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "b5224e19-2798-48be-8709-1aaa652997f6",
      name: "Hoco",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Hoco-1626943044692346097-full.png",
      description: "Hoco",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Hoco-1626943044702879960-full.jpg",
      order: 23,
      isActive: true,
      slug: "hoco",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "f0d97d12-3954-41eb-ae22-b806ef8f0bb7",
      name: "Dell",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/dell.png",
      description:
        "Dell бол компьютер, холбогдох бүтээгдэхүүн, үйлчилгээг боловсруулж, зарж, засварлаж, дэмждэг Америкийн \n\t\t үндэстэн дамнасан компьютерийн технологийн компани юм. Үүсгэн байгуулагч Майкл Деллийн нэрээр нэрлэгдсэн \n\t\t тус компани нь дэлхийн хамгийн том технологийн корпорациудын нэг бөгөөд АНУ болон дэлхийн өнцөг булан \n\t\t бүрт 165,000 гаруй хүнийг ажиллуулдаг.",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/dell-1618148677940891826-full.jpg",
      order: 24,
      isActive: true,
      slug: "dell",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "d65162ec-fdf9-46e3-8989-dc854c4dc3ae",
      name: "Remax",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Remax-1626943116719551237-full.png",
      description: "Remax",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Remax-1626943116497372172-full.jpg",
      order: 25,
      isActive: true,
      slug: "remax",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "d23f20a7-6d39-4fe6-8675-6200db873a79",
      name: "Jonsbo",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/JONSBO-1617915623033326741-full.png",
      description: "Jonsbo",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/JONSBO-1620910310834277579-full.jpg",
      order: 26,
      isActive: true,
      slug: "jonsbo",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "75a3f385-1c9f-4bc6-8433-40f5cc34f9d3",
      name: "Sharker",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/SHARKER-1617915716254395025-full.png",
      description: "Sharker",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Sharker-1620910462938371407-full.jpg",
      order: 27,
      isActive: true,
      slug: "sharker",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "b2a6e398-4219-4c8c-898d-b6e6f16250a2",
      name: "Asiahorse",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/ASIA-HORSE-1617915834429554829-full.png",
      description: "Asiahorse",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Asiahorse-1620910505974100576-full.jpg",
      order: 28,
      isActive: true,
      slug: "asiahorse",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "55f63704-72ec-47ec-aa00-98b18a8e0973",
      name: "Kingston HyperX",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/HyperX-1626943796872000201-full.png",
      description: "Hyperx",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/HyperX-1626943796890328737-full.jpg",
      order: 29,
      isActive: true,
      slug: "kingston-hyperx",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "64d9daac-9435-420d-8ef2-b63d8e1e376a",
      name: "Asrock",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/asrock.png",
      description:
        'Asrock бол Хятадын хэрэглээний электроникийн Бээжин хотын Huaqi Мэдээллийн Дижитал Технологийн ХХК-ийн худалдааны нэр юм. \n\t\t Aigo нь "iPod" шиг том үсгээр бичих ёсгүй. Үүний төв оффис нь Бээжин хотын Хайдиан дүүргийн Идеал Плазад байрладаг.',
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/asrock-1618148638187809362-full.jpg",
      order: 30,
      isActive: true,
      slug: "asrock",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "1010cd98-8bb3-495b-8bc7-c8c8800e59c4",
      name: "Sony",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/SONY-1617915701327350338-full.png",
      description: "Sony",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Sony-1620910454993098837-full.jpg",
      order: 31,
      isActive: true,
      slug: "sony",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "700006da-3421-4f24-8be9-349ddea3f683",
      name: "Epson",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/epson-1620899466558373860-full.png",
      description: "printer and scanner",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Epson-1620899829219449252-full.jpg",
      order: 32,
      isActive: true,
      slug: "epson",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "0f800bdf-d8c3-4411-bdc3-928b8d39c265",
      name: "Canon",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Canon-1620899665310495430-full.png",
      description: "Canon брэндийн бараанууд",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Canon-1620899665638048388-full.jpg",
      order: 33,
      isActive: true,
      slug: "canon",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "47a6a0ff-ab20-43c1-a202-53b51dca2f6b",
      name: "Hitech",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/HITECH-1617914983146297494-full.png",
      description: "Hitech",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Hitech-1620910060775334366-full.jpg",
      order: 34,
      isActive: true,
      slug: "hitech",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "3ef8dd14-f943-40ea-a424-35a0d2edc0f3",
      name: "Sandisk2",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Sandisk-1626943667602206116-full.png",
      description: "Sandisk",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Sandisk-1626943667614279547-full.jpg",
      order: 35,
      isActive: true,
      slug: "sandisk2",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "909e0599-9b25-4df3-ba8e-8cfe1eb5761e",
      name: "NoBrand",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/brandless-1620900343087909416-full.png",
      description: "No brand",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Brandless-1620900343958939911-full.jpg",
      order: 36,
      isActive: true,
      slug: "nobrand",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "61f781e9-3729-465a-9a7e-65055be74d1f",
      name: "Evga",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/EVGA-1617915400487108419-full.png",
      description: "Evga",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/EVGA-1620910222803016786-full.jpg",
      order: 37,
      isActive: true,
      slug: "evga",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "075abcae-fe91-48be-99b9-1b515120929b",
      name: "Toshiba",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/TOSHIBA-1617915751589418011-full.png",
      description: "Toshiba",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Toshiba-1620910479280375379-full.jpg",
      order: 38,
      isActive: true,
      slug: "toshiba",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "27f328c6-800b-4723-a53e-3a6eff619265",
      name: "PNY",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/PNY-1617915651258393310-full.png",
      description: "PNY",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/PNY-1620910425999929928-full.jpg",
      order: 39,
      isActive: true,
      slug: "pny",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "396d4573-779b-4756-b6b2-99fe83944756",
      name: "Crucial",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/CRUCIAL-1617915469796172923-full.png",
      description: "Crucial",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Crucial-1620910329240565778-full.jpg",
      order: 40,
      isActive: true,
      slug: "crucial",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "25d623c8-9fe3-4cab-a23a-695b5906f8b6",
      name: "BenQ",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/BENQ-1618148736435856336-full.png",
      description: "BENQ",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/BENQ-1620910031723590727-full.jpg",
      order: 41,
      isActive: true,
      slug: "benq",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "44d7ae9e-65db-4f80-aeb4-4138421b37a2",
      name: "Aigo",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/AIGO-1617915525880189248-full.png",
      description: "Aigo",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/AIGO-1620910355945275056-full.jpg",
      order: 42,
      isActive: true,
      slug: "aigo",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "2fff3bb3-0668-4adb-b02c-f9d4e461a5e5",
      name: "Bluemic",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/BLUEMIC-1617915669415414516-full.png",
      description: "BLuemic",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Blue-1620910435182945546-full.jpg",
      order: 43,
      isActive: true,
      slug: "bluemic",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "b77e58b6-c3af-4802-a1cf-750b394c9070",
      name: "Colorful",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/COLORFUL-1617915634532342924-full.png",
      description: "Colorful",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Colorful-1620910412246192442-full.jpg",
      order: 44,
      isActive: true,
      slug: "colorful",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "632d8b81-322d-4cef-a2a9-529ed6ddba41",
      name: "NZXT",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/NZXT-1617915066852483653-full.png",
      description: "NZXT",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/nzxt-1620910107302730568-full.jpg",
      order: 45,
      isActive: true,
      slug: "nzxt",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "395d4dd9-769c-4bea-83b2-eb45ca23230b",
      name: "Darkflash",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/DARKFLASH-1617915454294140519-full.png",
      description: "Darkflash",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Darkflash-1620910322481487509-full.jpg",
      order: 46,
      isActive: true,
      slug: "darkflash",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "c11e0b0e-9361-4e4d-b8dd-42155ab0dce2",
      name: "Metallic Gear",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/METALLIC-GEAR-1617915763814429956-full.png",
      description: "Metallic Gear",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Metallic-gear-1620910497688669633-full.jpg",
      order: 47,
      isActive: true,
      slug: "metallic-gear",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "1efa47a4-7e49-4351-9628-3ab123b7c40e",
      name: "Viewsonic",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/VIEWSONIC-1617915539772282176-full.png",
      description: "Viewsonic",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Viewsonic-1620910363526998030-full.jpg",
      order: 48,
      isActive: true,
      slug: "viewsonic",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "4bfc798b-5229-4da5-a76a-c4aa3aa3d431",
      name: "Phanteks",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/PHANTEKS-1617915123958549766-full.png",
      description: "Phanteks",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Phanteks-1620966782334574773-full.jpg",
      order: 49,
      isActive: true,
      slug: "phanteks",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "3c3d21d2-7510-4820-83ba-df841f29b6da",
      name: "Xiberia",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/XIBERIA-1617915495290176242-full.png",
      description: "Xiberia",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Xiberia-1620910336496221608-full.jpg",
      order: 50,
      isActive: true,
      slug: "xiberia",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "de5b23a3-accf-41ea-b3a1-039beaeb6288",
      name: "Biostar",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/BIOSTAR-1617915612764369722-full.png",
      description: "Biostar",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Biostar%2527-1620966888489759485-full.jpg",
      order: 51,
      isActive: true,
      slug: "biostar",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "18d24ed3-0ad2-4874-a241-e532a1bd73f0",
      name: "Coolermaster",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/COOLERMASTER-1617915049768401601-full.png",
      description: "Coolermaster",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Coolermaster-1620910087883999953-full.jpg",
      order: 52,
      isActive: true,
      slug: "coolermaster",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "b2747274-0d6d-43d4-bd4e-abfcb6e6b6b7",
      name: "Western Digital",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/WESTERN-DIGITAL-1617960339058397627-full.png",
      description: "Western digital",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/WD-1620910042542164081-full.jpg",
      order: 53,
      isActive: true,
      slug: "western-digital",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "3c90767f-33d5-4988-8c1f-a1b771918a77",
      name: "G-Skill",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/GSKILL-1617915437304154800-full.png",
      description: "G-Skill",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Gskill-1620910297644777904-full.jpg",
      order: 54,
      isActive: true,
      slug: "g-skill",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "b8827cb6-6d5c-4907-b882-c8055e4d83f0",
      name: "Antec",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/ANTEC-1617915198506736183-full.png",
      description: "Antec",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Antec-1620910200868695741-full.jpg",
      order: 55,
      isActive: true,
      slug: "antec",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "b9068e57-ee7f-46f2-a18d-b06d64e03ed8",
      name: "TeamGroup",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/TEAMGROUP-1617960289958314951-full.png",
      description: "TeamGroup",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Team-group-1620909939714897021-full.jpg",
      order: 56,
      isActive: true,
      slug: "teamgroup",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "718961b8-bd0a-46f3-b456-9400d31b0fe0",
      name: "Glorious",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/GLORIOUS-1617915167293684843-full.png",
      description: "Glorious",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Glorious-1620910181916976794-full.jpg",
      order: 57,
      isActive: true,
      slug: "glorious",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "fe6b8d92-5fe5-45b8-9f45-c6dd11c885c6",
      name: "Noctua",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/NOCTUA-1617915105472562706-full.png",
      description: "Noctua",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/noctua-1620910136346950529-full.jpg",
      order: 58,
      isActive: true,
      slug: "noctua",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "5cd9cac0-fa5e-48d7-8dd1-15e664305b3b",
      name: "Gigabyte",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/GIGABYTE-1617960310394167076-full.png",
      description: "Gigabyte",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Gigabyte-1620909973251862889-full.jpg",
      order: 59,
      isActive: true,
      slug: "gigabyte",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "f666f040-5626-43bb-9853-ccd280d79454",
      name: "Magic refiner",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/MAGIC-REFINER-1617960354501117577-full.png",
      description: "Magic refiner",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Magic-refiner-1620966719218054543-full.jpg",
      order: 60,
      isActive: true,
      slug: "magic-refiner",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "23b27bad-9efe-4c27-8ef5-e17e0a45957e",
      name: "HP",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/HP-1620900187806431383-full.png",
      description: "Hewlett Packard Брэндийн бараанууд",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/HP-1620900187976715717-full.jpg",
      order: 61,
      isActive: true,
      slug: "hp",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "65b8dbce-264c-4090-8023-b1cb88b48d12",
      name: "Dxracer",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/DXRACER-1617915513444297066-full.png",
      description: "Dxracer",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/DXracer-1620910346752654540-full.jpg",
      order: 62,
      isActive: true,
      slug: "dxracer",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "3a3e987c-f794-434e-b5e0-f95e364db9ba",
      name: "Sama",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/SAMA-1617915786538458354-full.png",
      description: "Sama",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Sama-1620910515323899362-full.jpg",
      order: 63,
      isActive: true,
      slug: "sama",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "1051c9bc-da2d-4d81-8e79-572fbf4827c2",
      name: "Great Wall",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/GREATWALL-1617915555363297248-full.png",
      description: "Great Wall",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Greatwall-1620910371908784116-full.jpg",
      order: 64,
      isActive: true,
      slug: "great-wall",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "239d7948-1e12-48a8-afb9-8e2909fcb10c",
      name: "Lian-Li",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/LIAN-LI-1617915153585730922-full.png",
      description: "Lian-Li",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Lianli-1620910158929738825-full.jpg",
      order: 65,
      isActive: true,
      slug: "lian-li",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "7b13c86f-66ef-4277-8b38-a7fa4137ae24",
      name: "Corsair",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/CORSAIR-1617915083886515159-full.png",
      description: "Corsair",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Corsair-1620910116666126860-full.jpg",
      order: 66,
      isActive: true,
      slug: "corsair",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "873c216a-5110-4f70-a4b1-365625743064",
      name: "Thermaltake",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/THERMALTAKE-1617915033849390347-full.png",
      description: "Thermaltake",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Thermaltake-1620910077821171217-full.jpg",
      order: 67,
      isActive: true,
      slug: "thermaltake",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "fbf72c94-34d3-4c2f-9f04-b4cdeb23c0d5",
      name: "Fuhlen",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/FUHLEN-1617915801271506880-full.png",
      description: "Fuhlen",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Fuhlen-1620910522693238363-full.jpg",
      order: 68,
      isActive: true,
      slug: "fuhlen",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "a7ef2a79-d402-4154-ab48-a8681931d988",
      name: "Motospeed",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/MOTOSPEED-1617915735749451287-full.png",
      description: "Motospeed",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Motospeed-1620910472086979437-full.jpg",
      order: 69,
      isActive: true,
      slug: "motospeed",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "06a64519-b394-43ec-9c9d-872a50892b9a",
      name: "Razer",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/RAZER-1617961012368626944-full.png",
      description:
        "Разер нь 1998 онд Сан Диего дахь Карна ХХК-ийн охин компани болж компьютерын тоглоомчдын дунд чиглэсэн Боомслангийн \n\t\t өндөр чанартай компьютер тоглоомын хулганыг хөгжүүлж, зах зээлд гаргах зорилгоор байгуулсан. Карна санхүүгийн асуудлаас \n\t\t болж 2000 онд үйл ажиллагаагаа зогсоосон. Разерын одоогийн давталтыг 2005 онд Сингапурын НУС-ийн төгсөгч Мин-Лян Тан, \n\t\t Роберт Кракофф нар Хонконгын магнат Ли Ка-Шинг, Темасек Холдингуудаас их хэмжээний хөрөнгө оруулалт хийсний дараа Razer \n\t\t брэндийн эрхийг худалдаж авсны дараа байгуулжээ. Байна.",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/razer-1620910016203017709-full.jpg",
      order: 70,
      isActive: true,
      slug: "razer",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
    {
      id: "7f5cbbe0-a091-4487-9ffb-3e5ba83a30f6",
      name: "Bykski",
      imageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/BYKSKI-1619200688151988715-full.png",
      description: "Bykski",
      coverImageUrl:
        "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/Bykski-1620910533208718012-full.jpg",
      order: 71,
      isActive: true,
      slug: "bykski",
      createdAt: "2022-11-13T11:32:42.536Z",
      updatedAt: "2022-11-13T11:32:42.536Z",
    },
  ],
  total: 72,
};
const collections: CollectionFromApi[] = [
  {
    id: "e2f8ac45-e293-45cc-bb20-076389b03af5",
    title: "Intel products",
    imageUrl:
      "https://hitech-bc-banners.s3.ap-southeast-1.amazonaws.com/271bbc9ef0b49c1d91a86fb7cf642058.jpg",
    description: "<p><br></p>",
    results: [
      {
        id: "26fdb5a4-43d7-4afa-a924-e1c15729cabf",
        name: "Intel - Core i5-13600KF Processor ",
        description:
          "<ul><li>14 cores (6 P-cores + 8 E-cores) and 20 threads.</li><li>Performance hybrid architecture integrates two core microarchitectures, prioritizing and distributing workloads to optimize performance.</li><li>Up to 5.1 GHz unlocked. 24M Cache.</li><li>Compatible with Intel 600 series and 700 series chipset-based motherboards.</li><li>Turbo Boost Max Technology 3.0, and PCIe 5.0 &amp; 4.0 support. Intel Optane Memory support. No thermal solution included. Discrete graphics required.</li></ul><p><br></p>",
        shortDescription: null,
        unitPrice: "1350000.00",
        status: "NEW",
        hasDelivery: true,
        weight: "0.00",
        stock: 1,
        createdById: "9484d445-64f1-4755-9d42-cdd5013aef46",
        brandId: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
        categoryId: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
        isActive: true,
        isDraft: false,
        sellEmptyStock: false,
        tags: [],
        salePrice: null,
        saleStartDate: "2022-11-29T05:14:15.914Z",
        saleEndDate: "2022-11-29T05:14:15.914Z",
        isSpecial: false,
        specialStartDate: null,
        specialEndDate: null,
        backgroundImageUrl: null,
        footerImages: [
          "https://hitech-bc-description.s3.ap-southeast-1.amazonaws.com/03fae28b0ca42394489f9e7ae30e23e1.gif",
          "https://hitech-bc-description.s3.ap-southeast-1.amazonaws.com/9207b99ae2df669be1b7964ff33e5953.gif",
        ],
        secretKeys: false,
        createdAt: "2022-11-29T06:46:26.734Z",
        updatedAt: "2022-12-03T06:23:04.470Z",
        medias: [
          {
            fileId: "6fd80ab3-6221-47b7-9ef9-36ada908d35b",
            position: 1,
            file: {
              id: "6fd80ab3-6221-47b7-9ef9-36ada908d35b",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/6fd80ab3-6221-47b7-9ef9-36ada908d35b_thumbs_small.gif",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/6fd80ab3-6221-47b7-9ef9-36ada908d35b_thumbs_medium.gif",
              fileType: "IMAGE",
            },
          },
          {
            fileId: "991a9f7b-f0a0-422f-9434-fcb266050ede",
            position: 0,
            file: {
              id: "991a9f7b-f0a0-422f-9434-fcb266050ede",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/991a9f7b-f0a0-422f-9434-fcb266050ede_thumbs_small.gif",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/991a9f7b-f0a0-422f-9434-fcb266050ede_thumbs_medium.gif",
              fileType: "IMAGE",
            },
          },
          {
            fileId: "1dd3f23c-4c2a-4ffc-b8ef-071ba5a0f34f",
            position: 2,
            file: {
              id: "1dd3f23c-4c2a-4ffc-b8ef-071ba5a0f34f",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/1dd3f23c-4c2a-4ffc-b8ef-071ba5a0f34f_thumbs_small.gif",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/1dd3f23c-4c2a-4ffc-b8ef-071ba5a0f34f_thumbs_medium.gif",
              fileType: "IMAGE",
            },
          },
        ],
        variants: [],
        brand: {
          id: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
          name: "Intel",
          imageUrl:
            "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/INTEL-1618148202313044788-full.png",
        },
        category: {
          id: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
          name: "Процессор / CPU",
        },
        createdBy: {
          id: "9484d445-64f1-4755-9d42-cdd5013aef46",
          firstName: "Usukhbayr",
        },
        properties: [],
      },
      {
        id: "9221f3cf-7865-4167-ba26-022dfea578c2",
        name: "Intel - Core i9-13900KF Processor",
        description:
          "<ul><li>24 cores (8 P-cores + 16 E-cores) and 32 threads.</li><li>Performance hybrid architecture integrates two core microarchitectures, prioritizing and distributing workloads to optimize performance.</li><li>Up to 5.8 GHz unlocked. 36M Cache.</li><li>Compatible with Intel 600 series and 700 series chipset-based motherboards.</li><li>Turbo Boost Max Technology 3.0, and PCIe 5.0 &amp; 4.0 support. Intel Optane Memory support. No thermal solution included. Discrete graphics required.</li></ul><p><br></p>",
        shortDescription: null,
        unitPrice: "2700000.00",
        status: "NEW",
        hasDelivery: true,
        weight: "0.00",
        stock: 1,
        createdById: "9484d445-64f1-4755-9d42-cdd5013aef46",
        brandId: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
        categoryId: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
        isActive: true,
        isDraft: false,
        sellEmptyStock: false,
        tags: [],
        salePrice: null,
        saleStartDate: "2022-11-29T05:14:15.914Z",
        saleEndDate: "2022-11-29T05:14:15.914Z",
        isSpecial: false,
        specialStartDate: null,
        specialEndDate: null,
        backgroundImageUrl: null,
        footerImages: [
          "https://hitech-bc-description.s3.ap-southeast-1.amazonaws.com/817777933538c93b6051d81861fa2f3b.gif",
          "https://hitech-bc-description.s3.ap-southeast-1.amazonaws.com/84829ed7311874d5d5890fa4c5f22164.gif",
        ],
        secretKeys: false,
        createdAt: "2022-11-29T05:41:51.714Z",
        updatedAt: "2022-11-29T06:47:01.280Z",
        medias: [
          {
            fileId: "b7d5ea8c-82f1-435f-9e0e-4bcc4dcee838",
            position: 0,
            file: {
              id: "b7d5ea8c-82f1-435f-9e0e-4bcc4dcee838",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/b7d5ea8c-82f1-435f-9e0e-4bcc4dcee838_thumbs_small.gif",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/b7d5ea8c-82f1-435f-9e0e-4bcc4dcee838_thumbs_medium.gif",
              fileType: "IMAGE",
            },
          },
          {
            fileId: "f41dc0b8-51a9-45eb-8945-343eca869c82",
            position: 1,
            file: {
              id: "f41dc0b8-51a9-45eb-8945-343eca869c82",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/f41dc0b8-51a9-45eb-8945-343eca869c82_thumbs_small.gif",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/f41dc0b8-51a9-45eb-8945-343eca869c82_thumbs_medium.gif",
              fileType: "IMAGE",
            },
          },
          {
            fileId: "da4900b1-47cf-4a87-8729-81cfa9370c1b",
            position: 2,
            file: {
              id: "da4900b1-47cf-4a87-8729-81cfa9370c1b",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/da4900b1-47cf-4a87-8729-81cfa9370c1b_thumbs_small.gif",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/da4900b1-47cf-4a87-8729-81cfa9370c1b_thumbs_medium.gif",
              fileType: "IMAGE",
            },
          },
        ],
        variants: [],
        brand: {
          id: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
          name: "Intel",
          imageUrl:
            "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/INTEL-1618148202313044788-full.png",
        },
        category: {
          id: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
          name: "Процессор / CPU",
        },
        createdBy: {
          id: "9484d445-64f1-4755-9d42-cdd5013aef46",
          firstName: "Usukhbayr",
        },
        properties: [],
      },
      {
        id: "b85f1dce-a26f-4625-9d48-69f8aa52bd2b",
        name: "Intel - Core i7-12700KF Processor",
        description:
          "<ul><li>Intel Core i7 3.60 GHz processor offers more cache space and the hyper-threading architecture delivers high performance for demanding applications with better onboard graphics and faster turbo boost.</li><li>The Socket LGA-1700 socket allows processor to be placed on the PCB without soldering.</li><li>11 MB L2 and 25 MB L3 cache offers supreme performance for computation intensive apps.</li><li>Intel 7 Architecture enables improved performance per watt and micro architecture makes it power-efficient.</li></ul><p><br></p>",
        shortDescription: null,
        unitPrice: "1450000.00",
        status: "NEW",
        hasDelivery: true,
        weight: "0.00",
        stock: 1,
        createdById: "9484d445-64f1-4755-9d42-cdd5013aef46",
        brandId: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
        categoryId: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
        isActive: true,
        isDraft: false,
        sellEmptyStock: false,
        tags: [],
        salePrice: null,
        saleStartDate: "2022-11-15T06:03:42.423Z",
        saleEndDate: "2022-11-15T06:03:42.423Z",
        isSpecial: false,
        specialStartDate: null,
        specialEndDate: null,
        backgroundImageUrl:
          "https://hitech-bc-banners.s3.ap-southeast-1.amazonaws.com/228316fe468fbac031e256568f291b25.jpg",
        footerImages: [
          "https://hitech-bc-description.s3.ap-southeast-1.amazonaws.com/e00d917a3ec7490a58fe61d54b227aaa.gif",
        ],
        secretKeys: false,
        createdAt: "2022-11-15T09:09:29.559Z",
        updatedAt: "2022-11-24T04:15:12.733Z",
        medias: [
          {
            fileId: "dc6d7db6-7d39-460e-9dac-6fa5005b3552",
            position: 0,
            file: {
              id: "dc6d7db6-7d39-460e-9dac-6fa5005b3552",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/dc6d7db6-7d39-460e-9dac-6fa5005b3552_thumbs_small.gif",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/dc6d7db6-7d39-460e-9dac-6fa5005b3552_thumbs_medium.gif",
              fileType: "IMAGE",
            },
          },
          {
            fileId: "e45cdcfe-a56f-4453-88b9-68e662ca509f",
            position: 1,
            file: {
              id: "e45cdcfe-a56f-4453-88b9-68e662ca509f",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/e45cdcfe-a56f-4453-88b9-68e662ca509f_thumbs_small.gif",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/e45cdcfe-a56f-4453-88b9-68e662ca509f_thumbs_medium.gif",
              fileType: "IMAGE",
            },
          },
          {
            fileId: "af3ab48d-7635-4da4-a0ac-5517dc7fb1b2",
            position: 2,
            file: {
              id: "af3ab48d-7635-4da4-a0ac-5517dc7fb1b2",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/af3ab48d-7635-4da4-a0ac-5517dc7fb1b2_thumbs_small.gif",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/af3ab48d-7635-4da4-a0ac-5517dc7fb1b2_thumbs_medium.gif",
              fileType: "IMAGE",
            },
          },
        ],
        variants: [],
        brand: {
          id: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
          name: "Intel",
          imageUrl:
            "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/INTEL-1618148202313044788-full.png",
        },
        category: {
          id: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
          name: "Процессор / CPU",
        },
        createdBy: {
          id: "9484d445-64f1-4755-9d42-cdd5013aef46",
          firstName: "Usukhbayr",
        },
        properties: [],
      },
      {
        id: "2a2d8c70-f61b-4136-a2fc-4684b4034af1",
        name: "Intel - Core i9-12900F Processor ",
        description:
          "<ul><li>The processor features Socket LGA-1700 socket for installation on the PCB</li><li>30 MB of L3 cache memory provides excellent hit rate in short access time enabling improved system performance</li></ul><p><br></p>",
        shortDescription: null,
        unitPrice: "1950000.00",
        status: "NEW",
        hasDelivery: true,
        weight: "0.00",
        stock: 1,
        createdById: "9484d445-64f1-4755-9d42-cdd5013aef46",
        brandId: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
        categoryId: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
        isActive: true,
        isDraft: false,
        sellEmptyStock: false,
        tags: [],
        salePrice: "0.00",
        saleStartDate: "2022-11-15T06:03:42.423Z",
        saleEndDate: "2022-11-25T04:00:00.000Z",
        isSpecial: false,
        specialStartDate: null,
        specialEndDate: null,
        backgroundImageUrl:
          "https://hitech-bc-banners.s3.ap-southeast-1.amazonaws.com/16441565ad3bb40db81816c9d3858d7e.jpg",
        footerImages: [
          "https://hitech-bc-description.s3.ap-southeast-1.amazonaws.com/eccd22f918c46592da01b5f05a9e368b.jpg",
        ],
        secretKeys: false,
        createdAt: "2022-11-15T09:03:33.717Z",
        updatedAt: "2022-11-24T08:29:30.122Z",
        medias: [
          {
            fileId: "70d25fe3-679d-45db-9f33-a8b851cb4b24",
            position: 1,
            file: {
              id: "70d25fe3-679d-45db-9f33-a8b851cb4b24",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/70d25fe3-679d-45db-9f33-a8b851cb4b24_thumbs_small.gif",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/70d25fe3-679d-45db-9f33-a8b851cb4b24_thumbs_medium.gif",
              fileType: "IMAGE",
            },
          },
          {
            fileId: "67334f08-b5fe-44a9-b6f6-8a6ecdb9fdd1",
            position: 0,
            file: {
              id: "67334f08-b5fe-44a9-b6f6-8a6ecdb9fdd1",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/67334f08-b5fe-44a9-b6f6-8a6ecdb9fdd1_thumbs_small.gif",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/67334f08-b5fe-44a9-b6f6-8a6ecdb9fdd1_thumbs_medium.gif",
              fileType: "IMAGE",
            },
          },
          {
            fileId: "5bb3b766-881d-4792-a905-f0106fa5d5a7",
            position: 2,
            file: {
              id: "5bb3b766-881d-4792-a905-f0106fa5d5a7",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/5bb3b766-881d-4792-a905-f0106fa5d5a7_thumbs_small.jpg",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/5bb3b766-881d-4792-a905-f0106fa5d5a7_thumbs_medium.jpg",
              fileType: "IMAGE",
            },
          },
        ],
        variants: [],
        brand: {
          id: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
          name: "Intel",
          imageUrl:
            "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/INTEL-1618148202313044788-full.png",
        },
        category: {
          id: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
          name: "Процессор / CPU",
        },
        createdBy: {
          id: "9484d445-64f1-4755-9d42-cdd5013aef46",
          firstName: "Usukhbayr",
        },
        properties: [],
      },
      {
        id: "fb67f2bc-4f22-4fae-9642-0e0309ba0fd5",
        name: "Intel - Core i5-12600KF Processor ",
        description:
          "<ul><li>Intel® Core® i5 processor offers hyper-threading architecture that delivers high performance for demanding applications with improved onboard graphics and turbo boost.</li><li>The processor features Socket LGA-1700 socket for installation on the PCB.</li><li>16 MB of L3 cache rapidly retrieves the most used data available to improve system performance.</li><li>Intel 7 Architecture enables improved performance per watt and micro architecture makes it power-efficient.</li></ul><p><br></p>",
        shortDescription: null,
        unitPrice: "900000.00",
        status: "NEW",
        hasDelivery: true,
        weight: "0.00",
        stock: 1,
        createdById: "9484d445-64f1-4755-9d42-cdd5013aef46",
        brandId: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
        categoryId: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
        isActive: true,
        isDraft: false,
        sellEmptyStock: false,
        tags: [],
        salePrice: null,
        saleStartDate: "2022-11-15T06:03:42.423Z",
        saleEndDate: "2022-11-15T06:03:42.423Z",
        isSpecial: false,
        specialStartDate: null,
        specialEndDate: null,
        backgroundImageUrl: null,
        footerImages: [],
        secretKeys: [],
        createdAt: "2022-11-15T08:50:32.375Z",
        updatedAt: "2022-11-15T08:50:32.375Z",
        medias: [
          {
            fileId: "6ed9548f-431e-4b31-ab70-5d09994dbeba",
            position: 0,
            file: {
              id: "6ed9548f-431e-4b31-ab70-5d09994dbeba",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/6ed9548f-431e-4b31-ab70-5d09994dbeba_thumbs_small.jpg",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/6ed9548f-431e-4b31-ab70-5d09994dbeba_thumbs_medium.jpg",
              fileType: "IMAGE",
            },
          },
        ],
        variants: [],
        brand: {
          id: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
          name: "Intel",
          imageUrl:
            "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/INTEL-1618148202313044788-full.png",
        },
        category: {
          id: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
          name: "Процессор / CPU",
        },
        createdBy: {
          id: "9484d445-64f1-4755-9d42-cdd5013aef46",
          firstName: "Usukhbayr",
        },
        properties: [],
      },
      {
        id: "a0c62158-6e2e-4f78-bd7d-7b95a0a7f6c6",
        name: "Intel - Core i5-12400 Processor ",
        description:
          "<ul><li>Intel Core i5 2.50 GHz processor offers hyper-threading architecture that delivers high performance for demanding applications with improved onboard graphics and turbo boost.</li><li>The processor features Socket LGA-1700 socket for installation on the PCB.</li><li>Its 18 MB of L3 cache is good enough to carry routine data and process them in a flash giving you fast and smooth performance.</li><li>Built-in Intel UHD Graphics 730 controller for improved graphics and visual quality. Supports up to 4 monitors.</li></ul><p><br></p>",
        shortDescription: null,
        unitPrice: "620000.00",
        status: "NEW",
        hasDelivery: true,
        weight: "0.00",
        stock: 1,
        createdById: "9484d445-64f1-4755-9d42-cdd5013aef46",
        brandId: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
        categoryId: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
        isActive: true,
        isDraft: false,
        sellEmptyStock: false,
        tags: [],
        salePrice: null,
        saleStartDate: "2022-11-15T06:03:42.423Z",
        saleEndDate: "2022-11-15T06:03:42.423Z",
        isSpecial: false,
        specialStartDate: null,
        specialEndDate: null,
        backgroundImageUrl: null,
        footerImages: [
          "https://hitech-bc-description.s3.ap-southeast-1.amazonaws.com/6f9993512b8f024fbea73bbc62e7a0b1.jpg",
        ],
        secretKeys: [],
        createdAt: "2022-11-15T08:46:49.250Z",
        updatedAt: "2022-11-15T08:46:49.250Z",
        medias: [
          {
            fileId: "63b8eb5b-524b-4c94-83a8-86ad5ab107c9",
            position: 0,
            file: {
              id: "63b8eb5b-524b-4c94-83a8-86ad5ab107c9",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/63b8eb5b-524b-4c94-83a8-86ad5ab107c9_thumbs_small.jpg",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/63b8eb5b-524b-4c94-83a8-86ad5ab107c9_thumbs_medium.jpg",
              fileType: "IMAGE",
            },
          },
        ],
        variants: [],
        brand: {
          id: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
          name: "Intel",
          imageUrl:
            "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/INTEL-1618148202313044788-full.png",
        },
        category: {
          id: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
          name: "Процессор / CPU",
        },
        createdBy: {
          id: "9484d445-64f1-4755-9d42-cdd5013aef46",
          firstName: "Usukhbayr",
        },
        properties: [],
      },
      {
        id: "f5e54b6c-009f-439b-a798-24f183e2adc2",
        name: "Intel - Core i3-12100F Processor ",
        description:
          "<ul><li>Intel Core i3-12100F Desktop Processor 4 (4P-0E) Cores Up to 4.3 GHz Turbo Frequency LGA1700 600 Series Chipset 58W Processor Base Power</li></ul><p><br></p>",
        shortDescription: null,
        unitPrice: "400000.00",
        status: "NEW",
        hasDelivery: true,
        weight: "0.00",
        stock: 1,
        createdById: "9484d445-64f1-4755-9d42-cdd5013aef46",
        brandId: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
        categoryId: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
        isActive: true,
        isDraft: false,
        sellEmptyStock: false,
        tags: [],
        salePrice: null,
        saleStartDate: "2022-11-15T06:03:42.423Z",
        saleEndDate: "2022-11-15T06:03:42.423Z",
        isSpecial: false,
        specialStartDate: null,
        specialEndDate: null,
        backgroundImageUrl: null,
        footerImages: [
          "https://hitech-bc-description.s3.ap-southeast-1.amazonaws.com/053011f31f7c09b28513f87d041c1953.jpg",
        ],
        secretKeys: [],
        createdAt: "2022-11-15T08:43:41.835Z",
        updatedAt: "2022-11-15T08:43:41.835Z",
        medias: [
          {
            fileId: "d353d906-02ac-4bf3-a9ee-9da02ee4d471",
            position: 0,
            file: {
              id: "d353d906-02ac-4bf3-a9ee-9da02ee4d471",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/d353d906-02ac-4bf3-a9ee-9da02ee4d471_thumbs_small.jpg",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/d353d906-02ac-4bf3-a9ee-9da02ee4d471_thumbs_medium.jpg",
              fileType: "IMAGE",
            },
          },
        ],
        variants: [],
        brand: {
          id: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
          name: "Intel",
          imageUrl:
            "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/INTEL-1618148202313044788-full.png",
        },
        category: {
          id: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
          name: "Процессор / CPU",
        },
        createdBy: {
          id: "9484d445-64f1-4755-9d42-cdd5013aef46",
          firstName: "Usukhbayr",
        },
        properties: [],
      },
      {
        id: "54b5367a-578b-4ce2-9908-b2d289d2489f",
        name: "Intel - Core i5-12400F Processor ",
        description:
          "<ul><li>Intel Core i5-12400F Desktop Processor 6 (6P+0E) Cores Up to 4.4 GHz Turbo Frequency LGA1700 600 Series Chipset 65W Processor Base Power.</li></ul><p><br></p>",
        shortDescription: null,
        unitPrice: "620000.00",
        status: "NEW",
        hasDelivery: true,
        weight: "0.00",
        stock: 1,
        createdById: "9484d445-64f1-4755-9d42-cdd5013aef46",
        brandId: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
        categoryId: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
        isActive: true,
        isDraft: false,
        sellEmptyStock: false,
        tags: [],
        salePrice: null,
        saleStartDate: "2022-11-15T06:03:42.423Z",
        saleEndDate: "2022-11-15T06:03:42.423Z",
        isSpecial: false,
        specialStartDate: null,
        specialEndDate: null,
        backgroundImageUrl: null,
        footerImages: [
          "https://hitech-bc-description.s3.ap-southeast-1.amazonaws.com/12ae7da3a18c702d72d24a161a9ad918.jpg",
        ],
        secretKeys: [],
        createdAt: "2022-11-15T08:37:42.283Z",
        updatedAt: "2022-11-15T08:37:42.283Z",
        medias: [
          {
            fileId: "130370ed-fe6a-4eb7-b17e-1d6a86ff2e9c",
            position: 0,
            file: {
              id: "130370ed-fe6a-4eb7-b17e-1d6a86ff2e9c",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/130370ed-fe6a-4eb7-b17e-1d6a86ff2e9c_thumbs_small.jpg",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/130370ed-fe6a-4eb7-b17e-1d6a86ff2e9c_thumbs_medium.jpg",
              fileType: "IMAGE",
            },
          },
        ],
        variants: [],
        brand: {
          id: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
          name: "Intel",
          imageUrl:
            "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/INTEL-1618148202313044788-full.png",
        },
        category: {
          id: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
          name: "Процессор / CPU",
        },
        createdBy: {
          id: "9484d445-64f1-4755-9d42-cdd5013aef46",
          firstName: "Usukhbayr",
        },
        properties: [],
      },
      {
        id: "fe4aa1c4-c213-46ff-aedf-349656cbfbbc",
        name: "Intel - Core i7-12700F Processor ",
        description:
          "<p>Intel Core i7-12700F 12th Gen Alder Lake Processor, LGA1700 Socket, 12Cores, 20 Threads, Up To 4.90GHz Max Frequency</p><p><br></p>",
        shortDescription: null,
        unitPrice: "1200000.00",
        status: "NEW",
        hasDelivery: true,
        weight: "0.00",
        stock: 1,
        createdById: "9484d445-64f1-4755-9d42-cdd5013aef46",
        brandId: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
        categoryId: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
        isActive: true,
        isDraft: false,
        sellEmptyStock: false,
        tags: [],
        salePrice: null,
        saleStartDate: "2022-11-15T06:03:42.423Z",
        saleEndDate: "2022-11-15T06:03:42.423Z",
        isSpecial: false,
        specialStartDate: null,
        specialEndDate: null,
        backgroundImageUrl: null,
        footerImages: [
          "https://hitech-bc-description.s3.ap-southeast-1.amazonaws.com/84e49466e14222ec247862facfc3af90.jpg",
        ],
        secretKeys: [],
        createdAt: "2022-11-15T06:24:28.044Z",
        updatedAt: "2022-11-15T06:24:28.044Z",
        medias: [
          {
            fileId: "39c57a61-b36f-4971-b750-d7ea5f4022c2",
            position: 0,
            file: {
              id: "39c57a61-b36f-4971-b750-d7ea5f4022c2",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/39c57a61-b36f-4971-b750-d7ea5f4022c2_thumbs_small.jpg",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/39c57a61-b36f-4971-b750-d7ea5f4022c2_thumbs_medium.jpg",
              fileType: "IMAGE",
            },
          },
        ],
        variants: [],
        brand: {
          id: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
          name: "Intel",
          imageUrl:
            "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/INTEL-1618148202313044788-full.png",
        },
        category: {
          id: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
          name: "Процессор / CPU",
        },
        createdBy: {
          id: "9484d445-64f1-4755-9d42-cdd5013aef46",
          firstName: "Usukhbayr",
        },
        properties: [],
      },
      {
        id: "5703c124-2243-444b-8833-cdaa237d5db7",
        name: "Intel - Core i9-12900K Processor ",
        description:
          "<ul><li>The processor features Socket LGA-1700 socket for installation on the PCB.</li><li>30 MB of L3 cache memory provides excellent hit rate in short access time enabling improved system performance</li><li>10 nm enables improved performance per watt and micro architecture makes it power-efficient.</li><li>Intel 7 Architecture enables improved performance per watt and micro architecture makes it power-efficient.</li></ul><p><br></p>",
        shortDescription: null,
        unitPrice: "2200000.00",
        status: "NEW",
        hasDelivery: true,
        weight: "0.00",
        stock: 1,
        createdById: "9484d445-64f1-4755-9d42-cdd5013aef46",
        brandId: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
        categoryId: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
        isActive: true,
        isDraft: false,
        sellEmptyStock: false,
        tags: [],
        salePrice: null,
        saleStartDate: "2022-11-15T06:03:42.423Z",
        saleEndDate: "2022-11-15T06:03:42.423Z",
        isSpecial: false,
        specialStartDate: null,
        specialEndDate: null,
        backgroundImageUrl: null,
        footerImages: [
          "https://hitech-bc-description.s3.ap-southeast-1.amazonaws.com/5e45da62cf34f7183badbd4846b5568c.jpg",
        ],
        secretKeys: false,
        createdAt: "2022-11-15T06:11:07.871Z",
        updatedAt: "2022-11-15T06:24:41.146Z",
        medias: [
          {
            fileId: "6f7aec30-77ab-4d1c-8baf-63bee453a521",
            position: 1,
            file: {
              id: "6f7aec30-77ab-4d1c-8baf-63bee453a521",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/6f7aec30-77ab-4d1c-8baf-63bee453a521_thumbs_small.jpg",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/6f7aec30-77ab-4d1c-8baf-63bee453a521_thumbs_medium.jpg",
              fileType: "IMAGE",
            },
          },
          {
            fileId: "15aa7f01-de24-4732-b563-a1733d8870df",
            position: 2,
            file: {
              id: "15aa7f01-de24-4732-b563-a1733d8870df",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/15aa7f01-de24-4732-b563-a1733d8870df_thumbs_small.jpg",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/15aa7f01-de24-4732-b563-a1733d8870df_thumbs_medium.jpg",
              fileType: "IMAGE",
            },
          },
          {
            fileId: "8a08dfc5-1a64-46ff-9b53-45c09643b936",
            position: 0,
            file: {
              id: "8a08dfc5-1a64-46ff-9b53-45c09643b936",
              smallUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/8a08dfc5-1a64-46ff-9b53-45c09643b936_thumbs_small.jpg",
              mediumUrl:
                "https://hitech-bc-main.s3.ap-southeast-1.amazonaws.com/8a08dfc5-1a64-46ff-9b53-45c09643b936_thumbs_medium.jpg",
              fileType: "IMAGE",
            },
          },
        ],
        variants: [],
        brand: {
          id: "4b541115-d9cf-44dd-a2a0-421ddd8aa42d",
          name: "Intel",
          imageUrl:
            "https://hitech-bc-brands.s3.ap-southeast-1.amazonaws.com/INTEL-1618148202313044788-full.png",
        },
        category: {
          id: "cd0a4d30-8ef4-4bff-94e2-dba275ff7b52",
          name: "Процессор / CPU",
        },
        createdBy: {
          id: "9484d445-64f1-4755-9d42-cdd5013aef46",
          firstName: "Usukhbayr",
        },
        properties: [],
      },
    ],
    total: 11,
  },
];
const Home: FC<{ homeProps: HomeProps }> = ({ homeProps }) => {
  const { bannersByType } = homeProps;
  const bigBannerData = useMemo(
    () => bannersByType?.HOME_BIG_SLIDER,
    [bannersByType]
  );
  const smallBannerData = useMemo(
    () => bannersByType?.HOME_BIG_SLIDER,
    [bannersByType]
  );
  return (
    <>
      <SeoHead title="LaslesVPN Landing Page" />
      <Layout>
        <>
          <BannerCarousel data={[...bigBannerData, ...bigBannerData]} />
          <SmallBannerCarousel
            data={[
              ...smallBannerData,
              ...smallBannerData,
              ...smallBannerData,
              ...smallBannerData,
              ...smallBannerData,
            ]}
          />
          <SpecialCollectionContainer
            data={collections as CollectionFromApi[]}
          />
          <CollectionContainer data={collections as CollectionFromApi[]} />
          {brands && brands.results ? (
            <BrandContainer data={brands.results} />
          ) : null}
          <HomeContainer />
          <Feature />
          <Pricing />
        </>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    homeProps: HomeProps;
  }>
> => {
  try {
    // const [banners, collections, brands] = await Promise.all([
    const [banners] = await Promise.all([
      bannerApi.find({
        fetchAll: true,
        filters: [
          {
            field: "bannerType",
            value: BannerType.CATEGORY_SLIDER,
            operator: Operator.NOT_EQUAL,
          },
        ],
      }),
      // collectionApi.find(),
      // brandApi.find({
      //   fetchAll: true,
      //   filters: [
      //     { field: "isActive", value: "true", operator: Operator.EQUAL },
      //   ],
      // }),
    ]);

    const bannersByType = reduce(
      banners.data?.results || [],
      (acc, $b: BannerFromApi) => {
        acc[$b.bannerType] = [...(acc[$b.bannerType] || []), $b];

        return acc;
      },
      {} as HomeProps["bannersByType"]
    );

    return {
      props: {
        homeProps: {
          bannersByType: bannersByType,
          // collections: collections.data,
          // brands: brands.data,
        },
      },
    };
  } catch (err) {
    console.error("failed to load home page", err);

    throw new Error("Failed to load!");
  }
};

export default Home;
