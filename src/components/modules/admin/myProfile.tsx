import React from 'react';
import {
    User,
    Mail,
    Shield,
    MapPin,
    Camera,
    Edit3,
    Lock,
    Settings,
    Briefcase,
    CheckCircle2
} from 'lucide-react';

const MyProfile = () => {
    // ডামি ইউজার ডাটা (আপনার ব্যাকএন্ড স্ট্রাকচার অনুযায়ী)
    const adminData = {
        name: "Md Mahin",
        role: "System Admin",
        email: "mdmahin@medistore.com",
        phone: "+880 1712-345678",
        address: "Sylhet, Bangladesh",
        joinedDate: "October 2023",
        status: "Active",
        bio: "Dedicated pharmaceutical administrator managing Medistore platform with a focus on supply chain efficiency and user security."
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-black text-slate-800 border-b-4 border-blue-600 inline-block pb-1">
                    Admin Profile
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-green-600"></div>
                        <div className="px-6 pb-8">
                            <div className="relative -mt-16 mb-4 flex justify-center">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center font-black text-4xl text-slate-500 shadow-lg overflow-hidden">
                                        {adminData.name.charAt(0)}
                                    </div>
                                    <button className="absolute bottom-1 right-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform hover:scale-110">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-center space-y-1">
                                <h2 className="text-2xl font-black text-slate-800">{adminData.name}</h2>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-tighter border border-green-100">
                                    <Shield className="w-3 h-3" />
                                    {adminData.role}
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase">Email Address</span>
                                        <span className="text-sm font-bold text-slate-700">{adminData.email}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                    <MapPin className="w-5 h-5 text-green-600" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-400 uppercase">Location</span>
                                        <span className="text-sm font-bold text-slate-700">{adminData.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Info & Settings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About Section */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                <Briefcase className="w-6 h-6 text-blue-600" />
                                Profile Biography
                            </h3>
                            <button className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all">
                                <Edit3 className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200">
                            {adminData.bio}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="space-y-1">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Created</span>
                                <p className="font-bold text-slate-800 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    {adminData.joinedDate}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Status</span>
                                <p className="font-bold text-green-600 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
                                    Verified Admin Access
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Settings Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button className="flex items-center justify-between p-6 bg-white rounded-3xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-black text-slate-800">Security</h4>
                                    <p className="text-xs font-bold text-slate-400">Update Password</p>
                                </div>
                            </div>
                            <Settings className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />
                        </button>

                        <button className="flex items-center justify-between p-6 bg-white rounded-3xl border-2 border-slate-100 hover:border-green-600 hover:bg-green-50 transition-all group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-all">
                                    <Settings className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-black text-slate-800">Preferences</h4>
                                    <p className="text-xs font-bold text-slate-400">System Settings</p>
                                </div>
                            </div>
                            <Settings className="w-5 h-5 text-slate-300 group-hover:text-green-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;