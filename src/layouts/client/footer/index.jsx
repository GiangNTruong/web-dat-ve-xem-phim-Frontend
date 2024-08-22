import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0D13] text-white">
      <div className="mx-auto p-8">
        <ul className="flex items-center justify-center flex-wrap gap-4 sm:gap-10 mb-6 sm:mb-10 text-sm md:text-base">
          <li>
            <a href="">Chính sách</a>
          </li>
          <li>
            <a href="">Lịch chiếu</a>{" "}
          </li>
          <li>
            <a href="">Tin tức</a>
          </li>
          <li>
            <a href="">Giá vé</a>
          </li>
          <li>
            <a href="">Hỏi đáp</a>
          </li>
          <li>
            <a href="">Liên hệ</a>
          </li>
        </ul>
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4 sm:gap-10">
          <div className="flex items-center gap-6">
            <FacebookOutlined className="!text-[30px] text-blue-400" />
            <TwitterOutlined className="!text-[30px] text-blue-600" />
            <YoutubeOutlined className="!text-[30px] text-red-500" />
          </div>

          <div className="flex gap-5 items-center">
            <a href="">
              <img
                width={140}
                height={38}
                src="https://th.bing.com/th/id/OIP.Ro739XbObP73gjGTg0mrCwHaCM?rs=1&pid=ImgDetMain"
                alt=""
              />
            </a>
            <a>
              <img
                width={130}
                height={38}
                src="https://th.bing.com/th/id/OIP.ZgivgsBKdCd-Qb_hazm-8wHaCM?w=313&h=103&c=7&r=0&o=5&pid=1.7"
                alt=""
              />
            </a>
            <a href="">
              <img
                width={130}
                height={38}
                src="https://th.bing.com/th/id/OIP.JWsl39NXvjcGkxk3H3aB8wHaCz?w=349&h=132&c=7&r=0&o=5&pid=1.7"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="text-center space-y-2 text-xs md:text-base mb-6">
          <p>Cơ quan chủ quản: BỘ VĂN HÓA , THỂ THAO VÀ DU LỊCH</p>
          <p>Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.</p>
          <p>
            Giấy phép số: 224/GP- TTĐT ngày 31/8/2010 - Chịu trách nhiệm: Vũ Đức
            Tùng - Giám đốc.
          </p>
          <p>
            Địa chỉ: 87 Láng Hạ, Quận Ba Đình, Tp Hà Nội - Điện thoại:
            024.35141791
          </p>
        </div>
        <div className="text-center text-sm">
          Copyright 2023 . NCC All Rights Reservered. Dev by
          <a href=""> Truong Giang</a>
        </div>
      </div>
    </footer>
  );
}
