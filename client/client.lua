local Keys = {
	["ESC"] = 322, ["F1"] = 288, ["F2"] = 289, ["F3"] = 170, ["F5"] = 166, ["F6"] = 167, ["F7"] = 168, ["F8"] = 169, ["F9"] = 56, ["F10"] = 57, 
	["~"] = 243, ["1"] = 157, ["2"] = 158, ["3"] = 160, ["4"] = 164, ["5"] = 165, ["6"] = 159, ["7"] = 161, ["8"] = 162, ["9"] = 163, ["-"] = 84, ["="] = 83, ["BACKSPACE"] = 177, 
	["TAB"] = 37, ["Q"] = 44, ["W"] = 32, ["E"] = 38, ["R"] = 45, ["T"] = 245, ["Y"] = 246, ["U"] = 303, ["P"] = 199, ["["] = 39, ["]"] = 40, ["ENTER"] = 18,
	["CAPS"] = 137, ["A"] = 34, ["S"] = 8, ["D"] = 9, ["F"] = 23, ["G"] = 47, ["H"] = 74, ["K"] = 311, ["L"] = 182,
	["LEFTSHIFT"] = 21, ["Z"] = 20, ["X"] = 73, ["C"] = 26, ["V"] = 0, ["B"] = 29, ["N"] = 249, ["M"] = 244, [","] = 82, ["."] = 81,
	["LEFTCTRL"] = 36, ["LEFTALT"] = 19, ["SPACE"] = 22, ["RIGHTCTRL"] = 70, 
	["HOME"] = 213, ["PAGEUP"] = 10, ["PAGEDOWN"] = 11, ["DELETE"] = 178,
	["LEFT"] = 174, ["RIGHT"] = 175, ["TOP"] = 27, ["DOWN"] = 173,
	["NENTER"] = 201, ["N4"] = 108, ["N5"] = 60, ["N6"] = 107, ["N+"] = 96, ["N-"] = 97, ["N7"] = 117, ["N8"] = 61, ["N9"] = 118
}

local Driving, Underwater, enableCruise, wasInCar, pedinVeh, beltOn = false, false, false, false, false, false
local lastjob, lastcash, lastbank, lastdirty, lastsociety, society, hunger, thirst, player, vehicle, vehicleIsOn

ESX = nil

Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj)
            ESX = obj
        end)
        Citizen.Wait(0)
    end

    while ESX.GetPlayerData().job == nil do
		Citizen.Wait(10)
    end

    ESX.PlayerData = ESX.GetPlayerData()
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
	PlayerData = xPlayer
	PlayerLoaded = true
end)

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
    ESX.PlayerData.job = job
end)

--[[Functions]]--
IsCar = function(veh)
    local vc = GetVehicleClass(veh)
    return (vc >= 0 and vc <= 7) or (vc >= 9 and vc <= 12) or (vc >= 17 and vc <= 20)
end	

Fwv = function (entity)
    local hr = GetEntityHeading(entity) + 90.0
    if hr < 0.0 then hr = 360.0 + hr end
    hr = hr * 0.0174533
    return { x = math.cos(hr) * 2.0, y = math.sin(hr) * 2.0 }
end

comma_value = function(amount)
    local formatted = amount
    
    while true do
        if formatted == nil then 
            break
        else
      formatted, k = string.gsub(formatted, "^(-?%d+)(%d%d%d)", '%1,%2')
        end
      if k == 0 then
        break
      end
    end
    return formatted
end

TriggerVehicleLoop = function()
    if mapon then
	    Citizen.CreateThread(function()
	    end)
    end
end

ToggleRadar = function(state)
	DisplayRadar(state)
	BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
	ScaleformMovieMethodAddParamInt(3)
	EndScaleformMovieMethod()
end

Voicelevel = function(val)
    SendNUIMessage({action = "voice_level", voicelevel = val})
end
exports('Voicelevel', Voicelevel)
--[[End of Functions]]--

--[[Threads]]--
Citizen.CreateThread(function()
    while true do
        Wait(3500)

        player = PlayerPedId()

        pedinVeh = IsPedInAnyVehicle(player, false)				
        vehicle = GetVehiclePedIsIn(player, false)
        vehicleIsOn = GetIsVehicleEngineRunning(vehicle)
        local hideseatbelt, showlimiter = false, false
        
        if IsEntityInWater(PlayerPedId()) then -- doesn't work with player variable
            Underwater = true
        else
            Underwater = false
        end
                     
        if IsPauseMenuActive() then
            showUi = false
        else 
            showUi = true
        end

        if IsPedInAnyVehicle(player, false) then
            showUi = false
        else 
            showUi = true
        end
        
        if IsPedArmed(player, 4 | 2) == 1 then
            showweap = true
        else
            showweap = false
        end

        SendNUIMessage({
            showOxygen = Underwater, 
            showUi = showUi,
            showweap = showweap
        })

        TriggerServerEvent('esx_inventoryhud:getServerInfo')
    end
end)

Citizen.CreateThread( function()
	while true do 
        Wait(900)
        local istalking = NetworkIsPlayerTalking(PlayerId()) -- doesn't work with player variable
        SendNUIMessage({talking = istalking})
    end
end)
--[[End of Threads]]--

--[[Status Event]]--
RegisterNetEvent('hud:setInfo')
AddEventHandler('hud:setInfo', function(info)

        if ESX.PlayerData.job and ESX.PlayerData.job.grade_name and ESX.PlayerData.job.grade_name == 'boss' then
            ESX.TriggerServerCallback('esx_society:getSocietyMoney', function(money)
                society = money
            end, ESX.PlayerData.job.name)
        else
            society =  0
        end

        TriggerEvent('esx_status:getStatus', 'hunger', function(status) hunger = status.val / 10000 end)
        TriggerEvent('esx_status:getStatus', 'thirst', function(status) thirst = status.val / 10000 end)

        if(lastjob ~= info['job']) then
            lastjob = info['job']
            SendNUIMessage({job = info['job']})
        end

        if(lastcash ~= info['money']) then
            lastcash = info['money']
            SendNUIMessage({money = comma_value(info['money'])})
        end

        if(lastbank ~= info['bankMoney']) then
            lastbank = info['bankMoney']
            SendNUIMessage({bank = comma_value(info['bankMoney'])})
        end

        if(lastdirty ~= info['blackMoney']) then
            lastdirty = info['blackMoney']
            SendNUIMessage({blackMoney = comma_value(info['blackMoney'])})
        end

        if(lastsociety ~= society) then
            lastsociety = society
            SendNUIMessage({society = comma_value(society)})
        end

    SendNUIMessage({
        action = "update_hud",
        hp = GetEntityHealth(PlayerPedId()) - 100,
        armor = GetPedArmour(PlayerPedId()),
        hunger = hunger,
        thirst = thirst,
        oxygen = GetPlayerUnderwaterTimeRemaining(PlayerId()) * 10 -- doesn't work with player variable
    })
end)

--[[Command Events]] 

RegisterNetEvent('hud:showjob')
AddEventHandler('hud:showjob', function()
    TriggerEvent('chat:addMessage', {
        color = { 150, 75, 0},
        multiline = true,
        args = {"Job Center", "Your job is " .. lastjob}
      })
end, false)   

RegisterNetEvent('hud:showcash')
AddEventHandler('hud:showcash', function()
    TriggerEvent('chat:addMessage', {
        color = { 0, 240, 0},
        multiline = true,
        args = {"Wallet", "You have $" .. comma_value(lastcash)}
      })
end, false)   

RegisterNetEvent('hud:showbank')
AddEventHandler('hud:showbank', function()
    TriggerEvent('chat:addMessage', {
        color = { 240, 0, 0},
        multiline = true,
        args = {"Bank", "You have $" .. comma_value(lastbank)}
      })
end, false)   

RegisterNetEvent('hud:showdirty')
AddEventHandler('hud:showdirty', function()
    TriggerEvent('chat:addMessage', {
        color = { 128, 128, 128},
        multiline = true,
        args = {"Pocket", "You have $" .. comma_value(lastdirty)}
      })
end, false)   

RegisterNetEvent('hud:showid')
AddEventHandler('hud:showid', function()
    TriggerEvent('chat:addMessage', {
        color = { 0, 240, 0},
        multiline = true,
        args = {"Wallet", "Your state ID is: " ..  GetPlayerServerId(PlayerId()) }
      })
end, false)   

RegisterNetEvent('hud:showsociety')
AddEventHandler('hud:showsociety', function()
    TriggerEvent('chat:addMessage', {
        color = { 150, 75, 0},
        multiline = true,
        args = {"Business", "The current business funds are $" ..  comma_value(society) }
      })
end, false)   

RegisterNetEvent('hud:hudmenu')
AddEventHandler('hud:hudmenu', function()
    SetNuiFocus(true, true)
    SendNUIMessage({showhudmenu = true})
end, false)   
--[[End of Command Events]]--

--[[Callbacks]]--
RegisterNUICallback('cancel', function()
    SetNuiFocus(false, false)
    SendNUIMessage({showhudmenu = false})
end)

Citizen.CreateThread(function()
    Citizen.Wait(100)

    while true do
        local sleepThread = 500

        local radarEnabled = IsRadarEnabled()

        if not IsPedInAnyVehicle(PlayerPedId()) and radarEnabled then
            DisplayRadar(false)
        elseif IsPedInAnyVehicle(PlayerPedId()) and not radarEnabled then
            DisplayRadar(true)
        end

        Citizen.Wait(sleepThread)
    end
end)
