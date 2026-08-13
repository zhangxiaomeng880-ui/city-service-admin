import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CirclePlus,
  MapPin,
  Search,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

type Doctor = {
  id: string;
  name: string;
  title: string;
  specialty: string;
  hospital: string;
  status: "启用" | "停用";
};

type Department = {
  id: string;
  name: string;
};

type CityData = {
  departments: Department[];
  doctors: Record<string, Doctor[]>;
};

const mockData: Record<string, CityData> = {
  深圳市: {
    departments: [
      { id: "internal", name: "内科" },
      { id: "surgery", name: "外科" },
      { id: "pediatrics", name: "儿科" },
      { id: "gynecology", name: "妇产科" },
      { id: "orthopedics", name: "骨科" },
      { id: "dermatology", name: "皮肤科" },
    ],
    doctors: {
      internal: [
        { id: "SZ-D001", name: "张医生", title: "主任医师", specialty: "心血管内科", hospital: "深圳市人民医院", status: "启用" },
        { id: "SZ-D002", name: "李医生", title: "副主任医师", specialty: "呼吸内科", hospital: "深圳市人民医院", status: "启用" },
        { id: "SZ-D003", name: "王医生", title: "主治医师", specialty: "消化内科", hospital: "深圳市人民医院", status: "启用" },
      ],
      surgery: [
        { id: "SZ-D011", name: "陈医生", title: "主任医师", specialty: "普外科", hospital: "深圳市人民医院", status: "启用" },
        { id: "SZ-D012", name: "刘医生", title: "副主任医师", specialty: "肝胆外科", hospital: "深圳市人民医院", status: "启用" },
      ],
      pediatrics: [{ id: "SZ-D021", name: "赵医生", title: "主任医师", specialty: "儿童呼吸", hospital: "深圳市儿童医院", status: "启用" }],
      gynecology: [],
      orthopedics: [],
      dermatology: [],
    },
  },
  广州市: {
    departments: [
      { id: "internal", name: "内科" },
      { id: "surgery", name: "外科" },
      { id: "pediatrics", name: "儿科" },
      { id: "oncology", name: "肿瘤科" },
    ],
    doctors: {
      internal: [{ id: "GZ-D001", name: "周医生", title: "主任医师", specialty: "心血管内科", hospital: "广州市第一人民医院", status: "启用" }],
      surgery: [{ id: "GZ-D011", name: "黄医生", title: "副主任医师", specialty: "普外科", hospital: "广州市第一人民医院", status: "启用" }],
      pediatrics: [],
      oncology: [],
    },
  },
  北京市: {
    departments: [{ id: "internal", name: "内科" }, { id: "surgery", name: "外科" }, { id: "orthopedics", name: "骨科" }],
    doctors: {
      internal: [{ id: "BJ-D001", name: "孙医生", title: "主任医师", specialty: "内分泌科", hospital: "北京协和医院", status: "启用" }],
      surgery: [],
      orthopedics: [],
    },
  },
  上海市: {
    departments: [{ id: "internal", name: "内科" }, { id: "surgery", name: "外科" }, { id: "gynecology", name: "妇产科" }],
    doctors: {
      internal: [{ id: "SH-D001", name: "吴医生", title: "副主任医师", specialty: "呼吸内科", hospital: "上海市第一人民医院", status: "启用" }],
      surgery: [],
      gynecology: [],
    },
  },
  杭州市: {
    departments: [{ id: "internal", name: "内科" }, { id: "pediatrics", name: "儿科" }],
    doctors: {
      internal: [{ id: "HZ-D001", name: "沈医生", title: "主任医师", specialty: "消化内科", hospital: "浙江大学医学院附属第一医院", status: "启用" }],
      pediatrics: [],
    },
  },
};

const cities = Object.keys(mockData);

export default function App() {
  const [city, setCity] = useState("深圳市");
  const [departmentId, setDepartmentId] = useState("internal");
  const [keyword, setKeyword] = useState("");
  const [doctorsByCity, setDoctorsByCity] = useState(mockData);
  const [modalOpen, setModalOpen] = useState(false);
  const [newDoctorName, setNewDoctorName] = useState("");
  const [newDoctorTitle, setNewDoctorTitle] = useState("主治医师");
  const [newDoctorSpecialty, setNewDoctorSpecialty] = useState("");

  const cityData = doctorsByCity[city];
  const departments = cityData.departments;
  const selectedDepartment = departments.find((item) => item.id === departmentId) ?? departments[0];
  const activeDepartmentId = selectedDepartment?.id ?? "";

  const doctors = useMemo(() => {
    const list = cityData.doctors[activeDepartmentId] ?? [];
    if (!keyword.trim()) return list;
    const q = keyword.trim();
    return list.filter((doctor) => `${doctor.name}${doctor.specialty}${doctor.title}`.includes(q));
  }, [cityData, activeDepartmentId, keyword]);

  const departmentCount = (id: string) => cityData.doctors[id]?.length ?? 0;

  const switchCity = (nextCity: string) => {
    setCity(nextCity);
    const nextDepartments = doctorsByCity[nextCity].departments;
    setDepartmentId(nextDepartments[0]?.id ?? "");
    setKeyword("");
  };

  const addDoctor = () => {
    if (!newDoctorName.trim() || !newDoctorSpecialty.trim() || !activeDepartmentId) return;
    const doctor: Doctor = {
      id: `${city.slice(0, 2)}-D${Date.now().toString().slice(-4)}`,
      name: newDoctorName.trim(),
      title: newDoctorTitle,
      specialty: newDoctorSpecialty.trim(),
      hospital: `${city}示范医院`,
      status: "启用",
    };
    setDoctorsByCity((current) => ({
      ...current,
      [city]: {
        ...current[city],
        doctors: {
          ...current[city].doctors,
          [activeDepartmentId]: [...(current[city].doctors[activeDepartmentId] ?? []), doctor],
        },
      },
    }));
    setNewDoctorName("");
    setNewDoctorSpecialty("");
    setNewDoctorTitle("主治医师");
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#1f2329]">
      <header className="h-16 border-b border-[#e8eaed] bg-white px-7 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#1677ff] flex items-center justify-center text-white"><Stethoscope size={18} /></div>
          <div className="text-[17px] font-semibold tracking-tight">城市服务管理后台</div>
          <div className="h-5 w-px bg-[#e5e6eb] mx-1" />
          <div className="text-[14px] text-[#86909c]">科室挂号</div>
        </div>
        <div className="flex items-center gap-4 text-[13px] text-[#86909c]"><span>管理员</span><div className="h-8 w-8 rounded-full bg-[#e8f3ff] text-[#1677ff] flex items-center justify-center font-medium">管</div></div>
      </header>

      <div className="flex min-h-[calc(100vh-64px)]">
        <aside className="w-[208px] border-r border-[#e8eaed] bg-white px-3 py-5">
          <div className="px-3 mb-3 text-[12px] text-[#86909c]">业务管理</div>
          <div className="h-10 rounded-lg bg-[#e8f3ff] text-[#1677ff] px-3 flex items-center gap-2 text-[14px] font-medium"><Stethoscope size={16} /> 科室挂号</div>
        </aside>

        <main className="flex-1 p-7 min-w-0">
          <div className="flex items-start justify-between mb-6">
            <div><h1 className="text-[24px] leading-8 font-semibold mb-1">科室挂号</h1><p className="text-[13px] text-[#86909c]">维护城市下的科室及科室对应医生信息</p></div>
            <button onClick={() => setModalOpen(true)} className="h-9 px-4 rounded-md bg-[#1677ff] text-white text-[14px] flex items-center gap-1.5 shadow-sm"><CirclePlus size={16} /> 新增医生</button>
          </div>

          <section className="bg-white border border-[#e8eaed] rounded-xl overflow-hidden">
            <div className="h-16 px-5 border-b border-[#f0f1f3] flex items-center justify-between">
              <div className="flex items-center gap-2"><MapPin size={16} className="text-[#1677ff]" /><span className="text-[14px] text-[#4e5969]">城市</span>
                <div className="relative"><select value={city} onChange={(event) => switchCity(event.target.value)} className="appearance-none h-9 min-w-[130px] pl-3 pr-8 border border-[#d9dce1] rounded-md bg-white text-[14px] outline-none focus:border-[#1677ff]">{cities.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} className="absolute right-2.5 top-3 text-[#86909c] pointer-events-none" /></div>
              </div>
              <div className="text-[13px] text-[#86909c]">当前城市：{city}</div>
            </div>

            <div className="grid grid-cols-[230px_1fr] min-h-[560px]">
              <div className="border-r border-[#f0f1f3] bg-[#fbfcfe] p-3">
                <div className="px-2 py-2 text-[12px] text-[#86909c]">科室列表</div>
                <div className="space-y-1">{departments.map((department) => {
                  const active = department.id === activeDepartmentId;
                  return <button key={department.id} onClick={() => { setDepartmentId(department.id); setKeyword(""); }} className={`w-full h-11 px-3 rounded-lg flex items-center justify-between text-left ${active ? "bg-white text-[#1677ff] shadow-[0_1px_4px_rgba(0,0,0,0.06)]" : "text-[#4e5969] hover:bg-white"}`}><span className="text-[14px] font-medium">{department.name}</span><span className={`text-[12px] ${active ? "text-[#1677ff]" : "text-[#86909c]"}`}>{departmentCount(department.id)} 人</span></button>;
                })}</div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <div><div className="flex items-center gap-1.5 text-[17px] font-semibold">{selectedDepartment?.name}<ChevronRight size={15} className="text-[#c9cdd4]" /><span className="text-[#86909c] font-normal">医生</span></div><div className="text-[12px] text-[#86909c] mt-1">共 {doctors.length} 位医生</div></div>
                  <div className="relative w-[230px]"><Search size={15} className="absolute left-3 top-3 text-[#86909c]" /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索医生姓名或专业" className="w-full h-9 pl-9 pr-3 border border-[#d9dce1] rounded-md text-[13px] outline-none focus:border-[#1677ff]" /></div>
                </div>

                <div className="border border-[#e8eaed] rounded-lg overflow-hidden">
                  <div className="grid grid-cols-[90px_1.1fr_1.2fr_1.2fr_100px_110px] h-11 items-center bg-[#f7f8fa] px-4 text-[12px] text-[#86909c]"><span>医生ID</span><span>医生</span><span>职称</span><span>专业</span><span>状态</span><span>操作</span></div>
                  {doctors.length ? doctors.map((doctor) => <div key={doctor.id} className="grid grid-cols-[90px_1.1fr_1.2fr_1.2fr_100px_110px] min-h-[60px] items-center px-4 border-t border-[#f0f1f3] text-[13px]"><span className="text-[#86909c]">{doctor.id}</span><span className="font-medium">{doctor.name}</span><span className="text-[#4e5969]">{doctor.title}</span><span className="text-[#4e5969]">{doctor.specialty}</span><span><span className="inline-flex items-center gap-1.5 text-[#00b42a]"><i className="w-1.5 h-1.5 rounded-full bg-[#00b42a]" />{doctor.status}</span></span><button onClick={() => { setNewDoctorName(doctor.name); setNewDoctorTitle(doctor.title); setNewDoctorSpecialty(doctor.specialty); setModalOpen(true); }} className="text-[#1677ff] hover:text-[#0e5fd8] text-left">编辑</button></div>) : <div className="h-48 flex flex-col items-center justify-center text-[#86909c]"><Users size={26} className="mb-2 text-[#c9cdd4]" /><div className="text-[13px]">暂无医生</div><div className="text-[12px] mt-1">可通过右上角「新增医生」添加</div></div>}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {modalOpen && <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-5 z-50" onMouseDown={(event) => { if (event.currentTarget === event.target) setModalOpen(false); }}>
        <div className="w-full max-w-[460px] rounded-xl bg-white shadow-2xl overflow-hidden">
          <div className="h-14 px-5 border-b border-[#f0f1f3] flex items-center justify-between"><div className="text-[16px] font-semibold">新增/编辑医生</div><button onClick={() => setModalOpen(false)} className="text-[#86909c] hover:text-[#1f2329]"><X size={18} /></button></div>
          <div className="p-5 space-y-4">
            <label className="block"><span className="block text-[13px] text-[#4e5969] mb-1.5">医生姓名</span><input value={newDoctorName} onChange={(event) => setNewDoctorName(event.target.value)} className="w-full h-9 px-3 border border-[#d9dce1] rounded-md text-[13px] outline-none focus:border-[#1677ff]" placeholder="请输入医生姓名" /></label>
            <label className="block"><span className="block text-[13px] text-[#4e5969] mb-1.5">职称</span><select value={newDoctorTitle} onChange={(event) => setNewDoctorTitle(event.target.value)} className="w-full h-9 px-3 border border-[#d9dce1] rounded-md text-[13px] bg-white outline-none focus:border-[#1677ff]"><option>主任医师</option><option>副主任医师</option><option>主治医师</option></select></label>
            <label className="block"><span className="block text-[13px] text-[#4e5969] mb-1.5">专业</span><input value={newDoctorSpecialty} onChange={(event) => setNewDoctorSpecialty(event.target.value)} className="w-full h-9 px-3 border border-[#d9dce1] rounded-md text-[13px] outline-none focus:border-[#1677ff]" placeholder="请输入专业方向" /></label>
          </div>
          <div className="h-16 px-5 border-t border-[#f0f1f3] flex items-center justify-end gap-2"><button onClick={() => setModalOpen(false)} className="h-9 px-4 rounded-md border border-[#d9dce1] text-[13px]">取消</button><button onClick={addDoctor} disabled={!newDoctorName.trim() || !newDoctorSpecialty.trim()} className="h-9 px-4 rounded-md bg-[#1677ff] text-white text-[13px] disabled:opacity-40">保存</button></div>
        </div>
      </div>}
    </div>
  );
}
