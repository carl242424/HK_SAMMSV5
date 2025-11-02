# Absence Tracking Implementation

## Overview
This implementation tracks absences when facilitators/checkers miss their `scheduleDate` by creating attendance records with `status="Absent"`.

## How It Works

### 1. SFDashboard.js (Student Facilitator Dashboard)
- **Location**: `student-facilitator-screens/SFDashboard.js`
- **Logic**: 
  - Checks all dates where there are active duties (last 90 days)
  - For each duty date, checks if there's a matching attendance record with the same `scheduleDate`
  - If no attendance record exists for a `scheduleDate`, it creates:
    - An absence record in `/api/absent` endpoint
    - A `FaciAttendance` record with `status="Absent"`

**Key Code Section**:
```javascript
// Check for attendance by scheduleDate (new logic)
const hasAttendanceBySchedule = checkerAttendance.some((att) => {
  const attScheduleDate = att.scheduleDate 
    ? moment(att.scheduleDate).format('YYYY-MM-DD')
    : moment(att.checkInTime).format('YYYY-MM-DD');
  return attScheduleDate === dateStr && att.location === duty.room;
});

// If no attendance record exists for this scheduleDate, mark as absent
if (!hasAttendanceBySchedule) {
  // Creates Absent record in faci-attendance API
  absentAttendanceRecords.push({
    studentId: username,
    studentName: checkerAttendance[0]?.studentName || username,
    scheduleDate: scheduleDate,
    location: duty.room,
    status: 'Absent',
    checkInTime: scheduleDate,
  });
}
```

### 2. ACDashboard.js (Attendance Checker Dashboard)
- **Location**: `attendance-checker-screens/ACDashboard.js`
- **Logic**: 
  - Same logic as SFDashboard but for checker attendance
  - Creates `CheckerAttendance` records with `status="Absent"` when `scheduleDate` is missed

**Key Code Section**:
```javascript
// NEW: Check for attendance by scheduleDate
const hasAttendanceBySchedule = checkerAttendance.some((att) => {
  const attScheduleDate = att.scheduleDate 
    ? moment(att.scheduleDate).format('YYYY-MM-DD')
    : moment(att.checkInTime).format('YYYY-MM-DD');
  return attScheduleDate === dateStr && att.location === duty.room;
});

// If no attendance record exists for this scheduleDate, mark as absent
if (!hasAttendanceBySchedule) {
  absentCount++;
  
  // Create Absent record in checkerAttendance
  absentAttendanceRecords.push({
    studentId: username,
    studentName: checkerAttendance[0]?.studentName || username,
    scheduleDate: scheduleDate,
    location: duty.room,
    status: 'Absent',
    checkInTime: scheduleDate,
  });
}
```

### 3. Dashboard.js (Admin Dashboard)
- **Location**: `admin-screens/Dashboard.js`
- **How to Fetch Absences**:

#### Method 1: Fetch All Records (Recommended - Already Implemented)
```javascript
// Fetches all attendance records (including Absent status)
const [faciRes, checkerRes] = await Promise.all([
  fetch('http://192.168.1.7:8000/api/faci-attendance'),
  fetch('http://192.168.1.7:8000/api/checkerAttendance'),
]);

const faciAttendances = await faciRes.json();
const checkerAttendances = await checkerRes.json();

// Filter for Absent records only
const faciAbsent = faciAttendances.filter(att => att.status === 'Absent');
const checkerAbsent = checkerAttendances.filter(att => att.status === 'Absent');
```

#### Method 2: Filter by Status (If API Supports It)
```javascript
// Fetch only Absent records
const [faciRes, checkerRes] = await Promise.all([
  fetch('http://192.168.1.7:8000/api/faci-attendance?status=Absent'),
  fetch('http://192.168.1.7:8000/api/checkerAttendance?status=Absent'),
]);
```

#### Method 3: Use Summary Endpoints
```javascript
// Use daily summary which includes absent counts
const summaryRes = await fetch(
  'http://192.168.1.7:8000/api/faci-attendance/summary/daily?startDate=2024-01-01&endDate=2024-01-31'
);
const summary = await summaryRes.json();
// Each item has: { date, present, absent, total, rate }
```

## Data Flow

1. **SFDashboard/ACDashboard runs**:
   - Checks duties vs attendance records
   - Identifies missed `scheduleDate`s
   - Creates `FaciAttendance`/`CheckerAttendance` records with `status="Absent"`

2. **Dashboard.js fetches data**:
   - Gets all attendance records from both APIs
   - Automatically counts records with `status="Absent"` as absent in charts
   - Records with `status="Present"` or `status="Pending"` count as present

## Status Values in Attendance Records

- `"Present"`: Attended and completed duty
- `"Pending"`: Checked in but not verified (counted as present)
- `"Absent"`: Missed `scheduleDate` (counted as absent)
- `null/empty`: Defaults to present if has checkInTime

## Important Notes

1. **Duplicate Prevention**: The code checks if an Absent record already exists before creating a new one
2. **Schedule Date Matching**: Absences are determined by matching `scheduleDate`, not just `checkInTime`
3. **Time Window**: Currently checks last 90 days for duties
4. **Today's Duties**: Today's absences are only counted after the shift end time has passed

## Testing

To verify this works:
1. Open SFDashboard or ACDashboard
2. Check console logs for: "Creating Absent records in faci-attendance/checkerAttendance"
3. In Dashboard.js, check console logs for: "Found X faci Absent records, Y checker Absent records"
4. Charts should show absent counts when scheduleDates are missed

