import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, CirclePlus, MapPin, Search, Stethoscope, Users, X } from "lucide-react";

type Doctor = { id: string; name: string; title: string; specialty: string; hospital: string; status: "启用" | "停用" };
type Department = { id: string; name: string; count: number };

const cities = ["深圳市", "广州市", "北京市", "上海市", "杭州市"];
const departments: Department[] = [
  { id: "internal", name: "内科", count: 8 }, { id: "surgery", name: "外科", count: 6 },
  { id: "pediatrics", name: "儿科", count: 5 }, { id: "gynecology", name: "妇产科", count: 4 },
  { id: "orthopedics", name: "骨科", count: 3 }, { id: "dermatology", name: "皮肤科", count: 3 },
];
const initialDoctors: Record<string, Doctor[]> = {
  internal: [
    { id: "D001", name: "张医生", title: "主任医师", specialty: "心血管内科", hospital: "深圳市人民医院", status: "启用" },
    { id: "D002", name: "李医生", title: "副主任医师", specialty: "呼吸内科", hospital: "深圳市人民医院", status: "启用" },
    { id: "D003", name: "王医生", title: "主治医师", specialty: "消化内科", hospital: "深圳市人民医院", status: "启用" },
  ],
  surgery: [
    { id: "D011", name: "陈医生", title: "主任医师", specialty: "普外科", hospital: "深圳市人民医院", status: "启用" },
    { id: "D012", name: "刘医生", title: "副主任医师", specialty: "肝胆外科", hospital: "深圳市人民医院", status: "启用" },
  ],
  pediatrics: [{ id: "D021", name: "赵医生", title: "主任医师", specialty: "儿童呼吸", hospital: "深圳市儿童医院", status: "启用" }],
  gynecology: [], orthopedics: [], dermatology: [],
};

export default function App() {
  const [city, setCity] = useState("深圳市");
  const [departmentId, setDepartmentId] = useState("internal");
  const [keyword, setKeyword] = useState("");
  const [doctorsByDepartment, setDoctorsByDepartment] = useState(initialDoctors);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [form, setForm] = useState({ name: "", title: "主治医师", specialty: "", hospital: "深圳市人民医院" });

  const doctors = useMemo(() => {
    const list = doctorsByDepartment[departmentId] ?? [];
    if (!keyword.trim()) return list;
    return list.filter((doctor) => `${doctor.name}${doctor.specialty}${doctor.title}`.includes(keyword.trim()));
  }, [departmentId, keyword, doctorsByDepartment]);
  const selectedDepartment = departments.find((item) => item.id === departmentId);

  const openAdd = () => { setEditing(null); setForm({ name: "", title: "主治医师", specialty: "", hospital: city === "深圳市" ? "深圳市人民医院" : `${city}人民医院` }); setModalOpen(true); };
  const openEdit = (doctor: Doctor) => { setEditing(doctor); setForm({ name: doctor.name, title: doctor.title, specialty: doctor.specialty, hospital: doctor.hospital }); setModalOpen(true); };
  const saveDoctor = () => {
    if (!form.name.trim() || !form.specialty.trim()) return;
    const current = doctorsByDepartment[departmentId] ?? [];
    if (editing) {
      setDoctorsByDepartment({ ...doctorsByDepartment, [departmentId]: current.map((d) => d.id === editing.id ? { ...d, ...form } : d) });
    } else {
      const nextId = `D${String(Date.now()).slice(-3)}`;
      setDoctorsByDepartment({ ...doctorsByDepartment, [departmentId]: [...current, { id: nextId, ...form, status: "启用" }] });
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#1f2329]">
      <header className="h-16 border-b border-[#e8eaed] bg-white px-7 flex items-center justify-between">
        <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-lg bg-[#1677ff] flex items-center justify-center text-white"><Stethoscope size={18} strokeWidth={2.2} /></div><div className="text-[17px] font-semibold tracking-tight">城市服务管理后台</div><div className="h-5 w-px bg-[#e5e6eb] mx-1" /><div className="text-[14px] text-[#86909c]">科室挂号</div></div>
        <div className="flex items-center gap-4 text-[13px] text-[#86909c]"><span>管理员</span><div className="h-8 w-8 rounded-full bg-[#e8f3ff] text-[#1677ff] flex items-center justify-center font-medium">管</div></div>
      </header>
      <div className="flex min-h-[calc(100vh-64px)]">
        <aside className="w-[208px] border-r border-[#e8eaed] bg-white px-3 py-5"><div className="px-3 mb-3 text-[12px] text-[#86909c]">业务管理</div><div className="h-10 rounded-lg bg-[#e8f3ff] text-[#1677ff] px-3 flex items-center gap-2 text-[14px] font-medium"><Stethoscope size={16} /> 科室挂号</div></aside>
        <main className="flex-1 p-7 min-w-0">
          <div className="flex items-start justify-between mb-6"><div><h1 className="text-[24px] leading-8 font-semibold mb-1">科室挂号</h1><p className="text-[13px] text-[#86909c]">维护城市下的科室及科室对应医生信息</p></div><button onClick={openAdd} className="h-9 px-4 rounded-md bg-[#1677ff] text-white text-[14px] flex items-center gap-1.5 shadow-sm"><CirclePlus size={16} /> 新增医生</button></div>
          <section className="bg-white border border-[#e8eaed] rounded-xl overflow-hidden">
            <div className="h-16 px-5 border-b border-[#f0f1f3] flex items-center justify-between"><div className="flex items-center gap-2"><MapPin size={16} className="text-[#1677ff]" /><span className="text-[14px] text-[#4e5969]">城市</span><div className="relative"><select value={city} onChange={(e) => setCity(e.target.value)} className="appearance-none h-9 min-w-[130px] pl-3 pr-8 border border-[#d9dce1] rounded-md bg-white text-[14px] outline-none focus:border-[#1677ff]">{cities.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} className="absolute right-2.5 top-3 text-[#86909c] pointer-events-none" /></div></div><div className="text-[13px] text-[#86909c]">当前城市：{city}</div></div>
            <div className="grid grid-cols-[230px_1fr] min-h-[560px]">
              <div className="border-r border-[#f0f1f3] bg-[#fbfcfe] p-3"><div className="px-2 py-2 text-[12px] text-[#86909c]">科室列表</div><div className="space-y-1">{departments.map((department) => { const active = department.id === departmentId; const count = doctorsByDepartment[department.id]?.length ?? 0; return <button key={department.id} onClick={() => { setDepartmentId(department.id); setKeyword(""); }} className={`w-full h-11 px-3 rounded-lg flex items-center justify-between text-left ${active ? "bg-white text-[#1677ff] shadow-[0_1px_4px_rgba(0,0,0,0.06)]" : "text-[#4e5969] hover:bg-white"}`}><span className="text-[14px] font-medium">{department.name}</span><span className={`text-[12px] ${active ? "text-[#1677ff]" : "text-[#86909c]"}`}>{count} 人</span></button>; })}</div></div>
              <div className="p-5"><div className="flex items-center justify-between mb-5"><div><div className="flex items-center gap-1.5 text-[17px] font-semibold">{selectedDepartment?.name}<ChevronRight size={15} className="text-[#c9cdd4]" /><span className="text-[#86909c] font-normal">医生</span></div><div className="text-[12px] text-[#86909c] mt-1">共 {doctors.length} 位医生</div></div><div className="relative w-[230px]"><Search size={15} className="absolute left-3 top-3 text-[#86909c]" /><input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="搜索医生姓名或专业" className="w-full h-9 pl-9 pr-3 border border-[#d9dce1] rounded-md text-[13px] outline-none focus:border-[#1677ff]" /></div></div>
                <div className="border border-[#e8eaed] rounded-lg overflow-hidden"><div className="grid grid-cols-[90px_1.1fr_1.2fr_1.2fr_100px_110px] h-11 items-center bg-[#f7f8fa] px-4 text-[12px] text-[#86909c]"><span>医生ID</span><span>医生</span><span>职称</span><span>专业</span><span>状态</span><span>操作</span></div>{doctors.length ? doctors.map((doctor) => <div key={doctor.id} className="grid grid-cols-[90px_1.1fr_1.2fr_1.2fr_100px_110px] min-h-[60px] items-center px-4 border-t border-[#f0f1f3] text-[13px]"><span className="text-[#86909c]">{doctor.id}</span><span className="font-medium">{doctor.name}</span><span className="text-[#4e5969]">{doctor.title}</span><span className="text-[#4e5969]">{doctor.specialty}</span><span><span className="inline-flex items-center gap-1.5 text-[#00b42a]"><i className="w-1.5 h-1.5 rounded-full bg-[#00b42a]" />{doctor.status}</span></span><button onClick={() => openEdit(doctor)} className="text-[#1677ff] hover:text-[#0e5fd8] text-left">编辑</button></div>) : <div className="h-48 flex flex-col items-center justify-center text-[#86909c]"><Users size={26} className="mb-2 text-[#c9cdd4]" /><div className="text-[13px]">暂无医生</div><div className="text-[12px] mt-1">可通过右上角「新增医生」添加</div></div>}</div>
              </div>
            </div>
          </section>
        </main>
      </div>
      {modalOpen && <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-5"><div className="w-full max-w-[520px] rounded-xl bg-white shadow-xl"><div className="h-14 px-5 border-b border-[#f0f1f3] flex items-center justify-between"><div className="font-semibold">{editing ? "编辑医生" : "新增医生"}</div><button onClick={() => setModalOpen(false)} className="text-[#86909c]"><X size={18} /></button></div><div className="p-5 space-y-4"><label className="block"><span className="block text-[13px] text-[#4e5969] mb-1.5">医生姓名 <b className="text-red-500">*</b></span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-9 border border-[#d9dce1] rounded-md px-3 text-[13px] outline-none focus:border-[#1677ff]" /></label><label className="block"><span className="block text-[13px] text-[#4e5969] mb-1.5">职称</span><select value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-9 border border-[#d9dce1] rounded-md px-3 text-[13px] bg-white"><option>主任医师</option><option>副主任医师</option><option>主治医师</option><option>住院医师</option></select></label><label className="block"><span className="block text-[13px] text-[#4e5969] mb-1.5">专业 <b className="text-red-500">*</b></span><input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className="w-full h-9 border border-[#d9dce1] rounded-md px-3 text-[13px] outline-none focus:border-[#1677ff]" /></label><label className="block"><span className="block text-[13px] text-[#4e5969] mb-1.5">所属医院</span><input value={form.hospital} onChange={(e) => setForm({ ...form, hospital: e.target.value })} className="w-full h-9 border border-[#d9dce1] rounded-md px-3 text-[13px] outline-none focus:border-[#1677ff]" /></label></div><div className="h-16 px-5 border-t border-[#f0f1f3] flex items-center justify-end gap-2"><button onClick={() => setModalOpen(false)} className="h-9 px-4 border border-[#d9dce1] rounded-md text-[13px]">取消</button><button onClick={saveDoctor} className="h-9 px-4 bg-[#1677ff] text-white rounded-md text-[13px]">保存</button></div></div></div>}
    </div>
  );
}
