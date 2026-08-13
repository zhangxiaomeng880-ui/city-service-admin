import { useState } from "react";
import type { ComponentType } from "react";
import {
  ArrowLeft, MapPin, ChevronDown, ChevronRight,
  Shield, Search, FileText, CreditCard, Clock, User, Banknote, Wallet,
  GraduationCap, BarChart2, Stethoscope, Pill, Activity, Receipt, Car,
  Home, Heart, Baby, Bus, Train, BookOpen, Trophy, Cloud, Landmark,
  Phone, Plane, Megaphone, MessageCircle, Calendar, CheckCircle2,
  BadgeCheck, AlertTriangle, Star, Building2,
} from "lucide-react";

type LIcon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
type Category = { id: string; name: string; color: string; bg: string; Icon: LIcon };
type Service  = { name: string; Icon: LIcon; color: string; bg: string };

const categories: Category[] = [
  { id: "shebao", name: "社保", color: "#1677FF", bg: "#E8F1FF", Icon: Shield },
  { id: "yibao", name: "医保", color: "#EF4444", bg: "#FEF0F0", Icon: Stethoscope },
  { id: "gongjijin", name: "公积金", color: "#F59E0B", bg: "#FFF8E6", Icon: Landmark },
  { id: "yiliao", name: "医疗健康", color: "#10B981", bg: "#EDFDF7", Icon: Heart },
  { id: "nashui", name: "纳税缴费", color: "#8B5CF6", bg: "#F3EFFE", Icon: Receipt },
  { id: "jiaoyu", name: "教育服务", color: "#0EA5E9", bg: "#E0F6FF", Icon: GraduationCap },
  { id: "fangchan", name: "房产服务", color: "#F97316", bg: "#FFF3EB", Icon: Home },
  { id: "hunyu", name: "婚育服务", color: "#EC4899", bg: "#FDF2F8", Icon: Baby },
  { id: "jiaotong", name: "交通出行", color: "#06B6D4", bg: "#E0FAFF", Icon: Bus },
  { id: "wenti", name: "文体服务", color: "#84CC16", bg: "#F3FBDF", Icon: Trophy },
  { id: "qixiang", name: "气象服务", color: "#64748B", bg: "#F1F5F9", Icon: Cloud },
  { id: "zhengwu", name: "政务服务", color: "#6366F1", bg: "#EEF2FF", Icon: Building2 },
];

const serviceMap: Record<string, Service[]> = {
  shebao: [
    { name: "深圳社保", Icon: Shield, color: "#1677FF", bg: "#E8F1FF" },
    { name: "社保查询", Icon: Search, color: "#3B82F6", bg: "#EFF6FF" },
    { name: "社保使用记录查询", Icon: FileText, color: "#6366F1", bg: "#EEF2FF" },
    { name: "电子社保卡", Icon: CreditCard, color: "#0EA5E9", bg: "#E0F6FF" },
    { name: "社保属地查询", Icon: MapPin, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "社保年限查询", Icon: Clock, color: "#10B981", bg: "#EDFDF7" },
    { name: "社保卡查询个人账户明细", Icon: User, color: "#8B5CF6", bg: "#F3EFFE" },
    { name: "社保缴纳", Icon: Banknote, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "社保卡余额充值", Icon: Wallet, color: "#EF4444", bg: "#FEF0F0" },
    { name: "普通高等学校本科专业查询", Icon: GraduationCap, color: "#10B981", bg: "#EDFDF7" },
    { name: "社保流水查询", Icon: BarChart2, color: "#6366F1", bg: "#EEF2FF" },
  ],
  yibao: [
    { name: "医保查询", Icon: Search, color: "#EF4444", bg: "#FEF0F0" },
    { name: "医保缴费记录", Icon: FileText, color: "#6366F1", bg: "#EEF2FF" },
    { name: "医保个人账户", Icon: User, color: "#8B5CF6", bg: "#F3EFFE" },
    { name: "门诊报销查询", Icon: Receipt, color: "#10B981", bg: "#EDFDF7" },
    { name: "医保卡余额", Icon: CreditCard, color: "#0EA5E9", bg: "#E0F6FF" },
    { name: "定点医院查询", Icon: Stethoscope, color: "#EF4444", bg: "#FEF0F0" },
  ],
  gongjijin: [
    { name: "公积金查询", Icon: Search, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "公积金提取申请", Icon: Banknote, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "公积金贷款查询", Icon: Home, color: "#10B981", bg: "#EDFDF7" },
    { name: "公积金缴存证明", Icon: FileText, color: "#6366F1", bg: "#EEF2FF" },
    { name: "住房公积金转移", Icon: Wallet, color: "#0EA5E9", bg: "#E0F6FF" },
  ],
  yiliao: [
    { name: "健康档案查询", Icon: FileText, color: "#10B981", bg: "#EDFDF7" },
    { name: "疫苗接种记录", Icon: Activity, color: "#EF4444", bg: "#FEF0F0" },
    { name: "体检预约", Icon: Calendar, color: "#1677FF", bg: "#E8F1FF" },
    { name: "家庭医生签约", Icon: Heart, color: "#EC4899", bg: "#FDF2F8" },
    { name: "慢病管理", Icon: Pill, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "健康码查询", Icon: CheckCircle2, color: "#10B981", bg: "#EDFDF7" },
  ],
  nashui: [
    { name: "个人所得税查询", Icon: Search, color: "#8B5CF6", bg: "#F3EFFE" },
    { name: "完税证明开具", Icon: FileText, color: "#1677FF", bg: "#E8F1FF" },
    { name: "车辆购置税缴纳", Icon: Car, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "税务登记", Icon: Landmark, color: "#10B981", bg: "#EDFDF7" },
    { name: "发票真伪查询", Icon: BadgeCheck, color: "#EF4444", bg: "#FEF0F0" },
  ],
  jiaoyu: [
    { name: "学历认证查询", Icon: GraduationCap, color: "#0EA5E9", bg: "#E0F6FF" },
    { name: "中高考成绩查询", Icon: BarChart2, color: "#6366F1", bg: "#EEF2FF" },
    { name: "义务教育学位申请", Icon: BookOpen, color: "#10B981", bg: "#EDFDF7" },
    { name: "普通高校专业查询", Icon: BookOpen, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "职业技能认定", Icon: BadgeCheck, color: "#8B5CF6", bg: "#F3EFFE" },
    { name: "教师资格证查询", Icon: User, color: "#0EA5E9", bg: "#E0F6FF" },
  ],
  fangchan: [
    { name: "不动产登记查询", Icon: Home, color: "#F97316", bg: "#FFF3EB" },
    { name: "住房公积金贷款", Icon: Banknote, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "房产交易信息", Icon: FileText, color: "#6366F1", bg: "#EEF2FF" },
    { name: "二手房备案查询", Icon: Search, color: "#10B981", bg: "#EDFDF7" },
    { name: "物业投诉", Icon: Phone, color: "#EF4444", bg: "#FEF0F0" },
  ],
  hunyu: [
    { name: "婚姻登记预约", Icon: Heart, color: "#EC4899", bg: "#FDF2F8" },
    { name: "生育登记", Icon: Baby, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "独生子女证查询", Icon: User, color: "#6366F1", bg: "#EEF2FF" },
    { name: "出生医学证明", Icon: FileText, color: "#10B981", bg: "#EDFDF7" },
    { name: "收养登记", Icon: Heart, color: "#EF4444", bg: "#FEF0F0" },
  ],
  jiaotong: [
    { name: "公交线路查询", Icon: Bus, color: "#10B981", bg: "#EDFDF7" },
    { name: "地铁换乘", Icon: Train, color: "#06B6D4", bg: "#E0FAFF" },
    { name: "驾照信息查询", Icon: CreditCard, color: "#6366F1", bg: "#EEF2FF" },
    { name: "车辆违章查询", Icon: Car, color: "#EF4444", bg: "#FEF0F0" },
    { name: "停车场导航", Icon: MapPin, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "交通违法缴费", Icon: Banknote, color: "#06B6D4", bg: "#E0FAFF" },
  ],
  wenti: [
    { name: "图书馆预约", Icon: BookOpen, color: "#1677FF", bg: "#E8F1FF" },
    { name: "文化场馆查询", Icon: Landmark, color: "#8B5CF6", bg: "#F3EFFE" },
    { name: "体育场馆预订", Icon: Trophy, color: "#84CC16", bg: "#F3FBDF" },
    { name: "旅游景点信息", Icon: MapPin, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "赛事活动查询", Icon: Star, color: "#EF4444", bg: "#FEF0F0" },
  ],
  qixiang: [
    { name: "实时天气查询", Icon: Cloud, color: "#0EA5E9", bg: "#E0F6FF" },
    { name: "未来7天预报", Icon: Calendar, color: "#1677FF", bg: "#E8F1FF" },
    { name: "台风路径追踪", Icon: AlertTriangle, color: "#EF4444", bg: "#FEF0F0" },
    { name: "空气质量指数", Icon: Activity, color: "#10B981", bg: "#EDFDF7" },
    { name: "气象灾害预警", Icon: AlertTriangle, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "历史气候数据", Icon: BarChart2, color: "#64748B", bg: "#F1F5F9" },
  ],
  zhengwu: [
    { name: "身份证业务办理", Icon: CreditCard, color: "#1677FF", bg: "#E8F1FF" },
    { name: "护照办理预约", Icon: Plane, color: "#EF4444", bg: "#FEF0F0" },
    { name: "居住证申办", Icon: Home, color: "#10B981", bg: "#EDFDF7" },
    { name: "出入境查询", Icon: Plane, color: "#0EA5E9", bg: "#E0F6FF" },
    { name: "政府信息公开", Icon: Megaphone, color: "#F59E0B", bg: "#FFF8E6" },
    { name: "行政审批查询", Icon: CheckCircle2, color: "#6366F1", bg: "#EEF2FF" },
    { name: "市民投诉建议", Icon: MessageCircle, color: "#8B5CF6", bg: "#F3EFFE" },
  ],
};

export default function App() {
  const [activeId, setActiveId] = useState("shebao");
  const activeCat = categories.find((c) => c.id === activeId)!;
  const services = serviceMap[activeId] ?? [];

  return (
    <div className="size-full flex items-center justify-center" style={{ background: "#C5CDD8", fontFamily: "'Noto Sans SC', sans-serif" }}>
      <div className="relative flex flex-col overflow-hidden" style={{ width: 375, height: 812, background: "#F5F6F8", borderRadius: 48, boxShadow: "0 0 0 10px #1C1C1E, 0 0 0 12px #3A3A3C, 0 32px 80px rgba(0,0,0,0.38), 0 8px 20px rgba(0,0,0,0.18)" }}>
        <div className="absolute left-1/2 -translate-x-1/2 z-20" style={{ top: 12, width: 118, height: 34, background: "#1C1C1E", borderRadius: 20 }} />
        <div className="flex-shrink-0 flex items-end justify-between bg-white z-10" style={{ height: 56, paddingLeft: 26, paddingRight: 20, paddingBottom: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A", letterSpacing: -0.4 }}>19:30</span>
          <div className="flex items-center gap-1.5">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><rect x="0" y="5" width="3" height="7" rx="1" fill="#1A1A1A" /><rect x="4.5" y="3" width="3" height="9" rx="1" fill="#1A1A1A" /><rect x="9" y="1" width="3" height="11" rx="1" fill="#1A1A1A" /><rect x="13.5" width="3" height="12" rx="1" fill="#1A1A1A" opacity="0.28" /></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1A1A1A", letterSpacing: -0.5 }}>5G</span>
            <div style={{ display: "flex", alignItems: "center" }}><div style={{ width: 24, height: 12, borderRadius: 3.5, border: "1.5px solid rgba(0,0,0,0.35)", padding: "1.5px", display: "flex", alignItems: "center" }}><div style={{ background: "#34C759", height: "100%", width: "88%", borderRadius: 1.5 }} /></div><div style={{ width: 1.5, height: 5, background: "rgba(0,0,0,0.3)", borderRadius: 1, marginLeft: 1 }} /></div>
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center justify-between bg-white z-10" style={{ height: 48, paddingLeft: 12, paddingRight: 16, borderBottom: "1px solid #EBEBEB", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-1"><button className="flex items-center justify-center" style={{ width: 40, height: 40 }}><ArrowLeft size={21} strokeWidth={2.2} color="#1A1A1A" /></button><span style={{ fontSize: 17, fontWeight: 600, color: "#1A1A1A" }}>城市服务</span></div>
          <button className="flex items-center gap-1 rounded-full" style={{ padding: "5px 10px", background: "#F4F5F7", border: "1px solid #E5E7EB" }}><MapPin size={12} color="#1677FF" strokeWidth={2.5} /><span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>深圳</span><ChevronDown size={12} color="#9CA3AF" strokeWidth={2.2} /></button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-shrink-0 flex flex-col overflow-y-auto" style={{ width: 96, background: "#F2F4F7", scrollbarWidth: "none" }}>
            {categories.map((cat) => {
              const active = cat.id === activeId;
              return <button key={cat.id} onClick={() => setActiveId(cat.id)} className="flex items-center w-full flex-shrink-0" style={{ height: 52, paddingLeft: 10, paddingRight: 6, gap: 7, background: active ? "#fff" : "transparent", borderLeft: `3px solid ${active ? cat.color : "transparent"}`, transition: "background 0.15s, border-color 0.15s" }}>
                <div className="flex items-center justify-center flex-shrink-0 rounded-lg" style={{ width: 28, height: 28, background: active ? cat.bg : "transparent" }}><cat.Icon size={15} color={active ? cat.color : "#9CA3AF"} strokeWidth={active ? 2.1 : 1.6} /></div>
                <span style={{ fontSize: 11, fontWeight: active ? 600 : 400, color: active ? cat.color : "#6B7280", lineHeight: 1.35, textAlign: "left", flex: 1 }}>{cat.name}</span>
              </button>;
            })}
          </div>
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <div className="flex-shrink-0 flex items-center gap-2.5" style={{ height: 44, paddingLeft: 14, paddingRight: 14, background: "#fff", borderBottom: "1.5px solid #F0F0F0" }}>
              <div className="flex items-center justify-center rounded-lg flex-shrink-0" style={{ width: 26, height: 26, background: activeCat.bg }}><activeCat.Icon size={14} color={activeCat.color} strokeWidth={2.1} /></div>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", letterSpacing: 0.1 }}>{activeCat.name}</span><div style={{ flex: 1 }} /><span style={{ fontSize: 11, color: "#C0C4CC" }}>{services.length} 项服务</span>
            </div>
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
              {services.map((svc, idx) => <button key={idx} className="w-full flex items-center" style={{ height: 56, paddingLeft: 14, paddingRight: 14, gap: 12, borderBottom: idx < services.length - 1 ? "1px solid #F5F5F5" : "none", background: "#fff" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFBFF")} onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}>
                <div className="flex items-center justify-center flex-shrink-0 rounded-xl" style={{ width: 36, height: 36, background: svc.bg }}><svc.Icon size={17} color={svc.color} strokeWidth={1.8} /></div>
                <span style={{ flex: 1, fontSize: 13, color: "#1A1A1A", textAlign: "left", lineHeight: 1.4 }}>{svc.name}</span><ChevronRight size={14} color="#D1D5DB" strokeWidth={2.2} />
              </button>)}
              <div style={{ height: 24 }} />
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center bg-white" style={{ height: 30 }}><div style={{ width: 130, height: 5, background: "#1C1C1E", borderRadius: 3, opacity: 0.18 }} /></div>
      </div>
    </div>
  );
}
